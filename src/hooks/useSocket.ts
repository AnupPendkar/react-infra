import * as socketIo from "socket.io-client";
import {
  AppWebSocketNSPEnum,
  ISocketClient,
  UseSocket,
  WSEventNameEnum,
} from "@models/common";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { environment } from "@environment/environment";
import { userSocketConnection } from "@redux/actions/userInfoActions";
import StorageHandler from "@shared/storageHandler";
import { isPropEmpty } from "@shared/utilfunctions";
import { useRef, useState } from "react";

const useSocket = (): UseSocket => {
  const storageHandler = new StorageHandler();
  const baseUrl =
    new URL(storageHandler.activeBaseUrl as string) ??
    new URL(environment.baseUrl as string);

  const dispatch = useAppDispatch();
  const { parsedUserInfo } = useAppSelector((state) => state?.user);
  const socketNamespace = AppWebSocketNSPEnum.WS_NSP__WAREHOUSE_DBD;
  const websocketEvents = [
    WSEventNameEnum.CARGO_PACKAGE_COUNT_LIVE_UPDATE_EVT,
    WSEventNameEnum.RACK_BASED_BIN_UPDATE,
    WSEventNameEnum.GROUND_STACK_CELL_UPDATE,
    WSEventNameEnum.JOB_STOP,
  ];

  const socketUrl = `${baseUrl.href}${socketNamespace}`;
  const socketioClients = useRef<Array<ISocketClient>>([]);
  // const socketioClients: Array<ISocketClient> = [];

  function isAllSocketsConnected() {
    console.log(socketioClients?.current?.length);
    return (
      !isPropEmpty(socketioClients?.current) &&
      socketioClients?.current.filter(
        (socket) => socket?.socket?.connected === false
      )?.length <= 0
      // socketioClients?.length ===
      //   requiredWebsocketDBDSolutions?.length
    );
  }

  function onConnectionError() {
    dispatch(userSocketConnection(false));
    console.log("connection error");
  }

  function onConnectionFailed() {
    dispatch(userSocketConnection(false));
    console.log("connection failed");
  }

  function disconnectSocketConnections() {
    console.log("disconnect");
    dispatch(userSocketConnection(false));
    socketioClients?.current?.forEach((socket) => {
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

      socketioClients?.current.push({
        namespace: socketNamespace,
        socket: socket,
      });

      if (isAllSocketsConnected()) {
        console.log("casdf");
        dispatch(userSocketConnection(true));
      }
      console.log({
        "Connected socket namespaces": socketioClients?.current?.map(
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
