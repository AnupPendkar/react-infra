import { isPropEmpty } from "@shared/utilfunctions";
import React, { useEffect } from "react";
import useUserMethod from "./useUserMethod";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { useAppSelector } from "@redux/store";
import useSocket from "./useSocket";
import { UseSocket } from "@models/common";

const useAppUseEffectWrapper = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const userMethod = useUserMethod();
  const dybaseConfigurator = new DyBaseUrlConfigurator();
  const apiInfo = useAppSelector((state) => state?.http);
  const userInfo = useAppSelector((state) => state.user);
  const socket: UseSocket = useSocket();

  useEffect(() => {
    console.log("apiInfo");
    setLoading(apiInfo.loading);
  }, [apiInfo]);

  useEffect(() => {
    console.log("userInfo");
    if (userInfo.userLoggedIn) {
      socket.connect();
    }
  }, [userInfo]);
  
  useEffect(() => {
    console.log("jklsdf");
    const accessToken = dybaseConfigurator.jwtAccesToken;
    const refreshToken = dybaseConfigurator.jwtRefreshToken;

    if (!isPropEmpty(accessToken) && !isPropEmpty(refreshToken)) {
      userMethod.setUserLoginData(
        accessToken as string,
        refreshToken as string
      );
    }
  }, []);
};

export default useAppUseEffectWrapper;
