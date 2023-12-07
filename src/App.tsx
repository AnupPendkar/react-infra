import "./App.scss";
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BaseUrlConfigurator from "@views/base-url-config/BaseUrlConfigurator";
import { useAppSelector } from "@redux/store";
import VIew1 from "@views/VIew1";
import Login from "@views/login/Login";
import useSocket from "@hooks/useSocket";
import { UseSocket } from "@models/common";
import useUserMethod from "@hooks/useUserMethod";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { isPropEmpty } from "@shared/utilfunctions";
import Button from "@mui/material/Button";
import Loader from "@components/loader/Loader";

function App() {
  const [loading, setLoading] = useState(false);
  const socket: UseSocket = useSocket();
  const apiInfo = useAppSelector((state) => state?.http);
  const userVar = useAppSelector((state) => state?.user);
  const userInfo = useAppSelector((state) => state.user);
  const userMethod = useUserMethod();
  const dybaseConfigurator = new DyBaseUrlConfigurator();

  const onLogoutClick = () => {
    userMethod.logout();
  };

  const getSocketStatusAndShowLogout = () => {
    return (
      <div className="flex align-items-center justify-content-between">
        <p className="fsr-20">
          {socket.isConnected ? "Socket Connected" : "Socket Disconnected"}
        </p>
        <Button onClick={onLogoutClick} variant="outlined">
          Logout
        </Button>
      </div>
    );
  };

  useEffect(() => {
    setLoading(apiInfo.loading);
  }, [apiInfo]);

  useEffect(() => {
    if (userInfo.userLoggedIn) {
      socket.connect();
    }
  }, [userInfo]);

  useEffect(() => {
    const accessToken = dybaseConfigurator.jwtAccesToken;
    const refreshToken = dybaseConfigurator.jwtRefreshToken;

    if (!isPropEmpty(accessToken) && !isPropEmpty(refreshToken)) {
      userMethod.setUserLoginData(
        accessToken as string,
        refreshToken as string
      );
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {userInfo?.userLoggedIn && getSocketStatusAndShowLogout()}
        {loading && <Loader />} {/* Loader */}
        <Routes>
          <Route
            path="/"
            element={
              !userVar.userLoggedIn ? (
                <Navigate to="/login" />
              ) : (
                <Navigate to="/app" />
              )
            }
          />
          <Route path="/login" Component={Login} />
          <Route
            path="/app"
            element={
              userInfo?.userLoggedIn ? <VIew1 /> : <Navigate to="/login" />
            }
          />
          <Route path="/config" Component={BaseUrlConfigurator} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
