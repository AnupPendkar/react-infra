import { isPropEmpty } from "@shared/utilfunctions";
import React, { useEffect, useState } from "react";
import useAuthMethods from "./useAuthMethods";
import { useAppSelector } from "@redux/store";
import useSocket from "./useSocket";
import { UseSocket } from "@models/common";
import StorageHandler from "@shared/storageHandler";

const useAppEffects = () => {
  const {setUserLoginData} = useAuthMethods();
  const [loading, setLoading] = useState(false);
  const storageHandler = new StorageHandler();
  const apiInfo = useAppSelector((state) => state?.http);
  const userInfo = useAppSelector((state) => state.user);
  const socket: UseSocket = useSocket();

  useEffect(() => {
    console.log("apiInfo");
    setLoading(apiInfo.loading);
  }, [apiInfo]);

  useEffect(() => {
    if (userInfo.userLoggedIn) {
      console.log("userInfo");
      socket.connect();
    }
  }, [userInfo]);
  
  useEffect(() => {
    console.log("jklsdf");
    const accessToken = storageHandler.jwtAccesToken;
    const refreshToken = storageHandler.jwtRefreshToken;

    if (!isPropEmpty(accessToken) && !isPropEmpty(refreshToken)) {
      setUserLoginData(
        accessToken as string,
        refreshToken as string
      );
    }
  }, []);

  return {loading}
};

export default useAppEffects;
