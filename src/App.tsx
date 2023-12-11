import "./App.scss";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@redux/store";
import { MessageTypeEnum, UseSocket } from "@models/common";
import useAuthMethods from "@hooks/useAuthMethods";
import Button from "@mui/material/Button";
import Loader from "@components/loader/Loader";
import MessageBox from "@components/message-box/MessageBox";
import RouteHandler from "./essentials/route-handler/RouteHandler";
import useAppEffects from "@hooks/useAppEffects";

function App() {
  const {userLoggedIn} = useAppSelector((state) => state.user);
  const {logout} = useAuthMethods();
  const {loading} = useAppEffects();

  const onLogoutClick = () => {
    logout();
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
      {userLoggedIn && getSocketStatusAndShowLogout()}
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
