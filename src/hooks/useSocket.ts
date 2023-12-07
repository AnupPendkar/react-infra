import { useState } from "react";
import * as socketIo from "socket.io-client";
import {
  AppWebSocketNSPEnum,
  UseSocket,
  WSEventNameEnum,
} from "@models/common";
import { useAppSelector } from "@redux/store";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { environment } from "@environment/environment";

interface ISocketClient {
  namespace: AppWebSocketNSPEnum;
  socket: socketIo.Socket;
}

const useSocket = (): UseSocket => {
  const dyBaseConfigurator = new DyBaseUrlConfigurator();
  const baseUrl =
    new URL(dyBaseConfigurator.activeBaseUrl as string) ??
    new URL(environment.baseUrl as string);

  const userInfo = useAppSelector((state) => state?.user);
  const socketNamespace = AppWebSocketNSPEnum.WS_NSP__WAREHOUSE_DBD;
  const socketUrl = `${baseUrl.href}${socketNamespace}`;
  const websocketEvents = [
    WSEventNameEnum.CARGO_PACKAGE_COUNT_LIVE_UPDATE_EVT,
    WSEventNameEnum.RACK_BASED_BIN_UPDATE,
    WSEventNameEnum.GROUND_STACK_CELL_UPDATE,
    WSEventNameEnum.JOB_STOP,
  ];

  const socketioClients: Array<ISocketClient> = [];

  const [isConnected, setIsConnected] = useState<boolean>(false);

  function onConnectionError() {
    console.log("connection error");
  }

  function onConnectionFailed() {
    console.log("connection failed");
  }

  function disconnectSocketConnections() {
    console.log("disconnect");
    setIsConnected(false);
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
      setIsConnected(true);
      websocketEvents.forEach((event) => {
        socket.on(event, (response: any) => {
          console.log(event, response);
        });
      });

      // join into a socketio namespace room by the current login username.
      socket.emit(
        "join",
        {
          username: userInfo.parsedUserInfo?.username,
          token: userInfo.parsedUserInfo?.token,
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
    isConnected,
    connect: initSocketConnection,
    disconnect: disconnectSocketConnections,
  };
};

export default useSocket;
