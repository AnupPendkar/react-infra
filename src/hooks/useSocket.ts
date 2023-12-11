import * as socketIo from "socket.io-client";
import {
  AppWebSocketNSPEnum,
  UseSocket,
  WSEventNameEnum,
} from "@models/common";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { environment } from "@environment/environment";
import { userSocketConnection } from "@redux/actions/userInfoActions";
import StorageHandler from "@shared/storageHandler";

interface ISocketClient {
  namespace: AppWebSocketNSPEnum;
  socket: socketIo.Socket;
}

const useSocket = (): UseSocket => {
  const storageHandler = new StorageHandler();
  const baseUrl =
    new URL(storageHandler.activeBaseUrl as string) ??
    new URL(environment.baseUrl as string);

  const dispatch = useAppDispatch();
  const {parsedUserInfo} = useAppSelector((state) => state?.user);
  const socketNamespace = AppWebSocketNSPEnum.WS_NSP__WAREHOUSE_DBD;
  const socketUrl = `${baseUrl.href}${socketNamespace}`;
  const websocketEvents = [
    WSEventNameEnum.CARGO_PACKAGE_COUNT_LIVE_UPDATE_EVT,
    WSEventNameEnum.RACK_BASED_BIN_UPDATE,
    WSEventNameEnum.GROUND_STACK_CELL_UPDATE,
    WSEventNameEnum.JOB_STOP,
  ];

  const socketioClients: Array<ISocketClient> = [];

  function onConnectionError() {
    console.log("connection error");
  }

  function onConnectionFailed() {
    console.log("connection failed");
  }

  function disconnectSocketConnections() {
    console.log("disconnect");
    dispatch(userSocketConnection(true));
    socketioClients?.forEach((socket) => {
      socket?.socket?.disconnect();
    });
  }

  const initSocketConnection = (): void => {
    disconnectSocketConnections();

    const socket = socketIo.connect(socketUrl, {
      transports: ["websocket"],
    });

    socket.on(WSEventNameEnum.CONNECTION_ERROR, onConnectionError);
    socket.on(WSEventNameEnum.CONNECTION_FAILED, onConnectionFailed);
    socket.on(WSEventNameEnum.DISCONNECT, disconnectSocketConnections);
    socket.on(WSEventNameEnum.CONNECT, () => {
      dispatch(userSocketConnection(true));

      websocketEvents.forEach((event) => {
        socket.on(event, (response: any) => {
          console.log(event, response);
        });
      });

      // join into a socketio namespace room by the current login username.
      socket.emit(
        "join",
        {
          username: parsedUserInfo?.username,
          token: parsedUserInfo?.token,
        },
        (response: any) => {
          // 401 is agreed by server to be an authentication failure signal.
          if (response === 401) {
            console.error(
              "Server reported invalid authentication, cannot proceed with enabling socket connections."
            );
            disconnectSocketConnections();
          }
        }
      );

      socketioClients.push({ namespace: socketNamespace, socket: socket });
      console.log({
        "Connected socket namespaces": socketioClients?.map(
          (nsp) => `${baseUrl}${nsp?.namespace}`
        ),
      });
    });
  };

  return {
    connect: initSocketConnection,
    disconnect: disconnectSocketConnections,
  };
};

export default useSocket;
