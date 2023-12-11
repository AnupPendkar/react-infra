import "./App.scss";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@redux/store";
import useSocket from "@hooks/useSocket";
import { MessageTypeEnum, UseSocket } from "@models/common";
import useUserMethod from "@hooks/useUserMethod";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { isPropEmpty } from "@shared/utilfunctions";
import Button from "@mui/material/Button";
import Loader from "@components/loader/Loader";
import MessageBox from "@components/message-box/MessageBox";
import RouteHandler from "./essentials/route-handler/RouteHandler";
import useAppUseEffectWrapper from "@hooks/useAppUseEffectWrapper";

function App() {
  const [loading, setLoading] = useState(false);
  const userInfo = useAppSelector((state) => state.user);
  const userMethod = useUserMethod();

  const useEffectWrapper = useAppUseEffectWrapper(setLoading);

  const onLogoutClick = () => {
    userMethod.logout();
  };

  const getSocketStatusAndShowLogout = () => {
    return (
      <div className="flex align-items-center justify-content-between">
        <Button onClick={onLogoutClick} variant="outlined">
          Logout
        </Button>
      </div>
    );
  };

 

  return (
    <div className="App">
      {userInfo?.userLoggedIn && getSocketStatusAndShowLogout()}
      {loading && <Loader />} {/* Loader */}
      <RouteHandler />
      <MessageBox
        dialogHeading="Oops!"
        dialogMessage={`Failed with server error code (500)`}
        messageType={MessageTypeEnum.ERROR}
      />
    </div>
  );
}

export default App;
