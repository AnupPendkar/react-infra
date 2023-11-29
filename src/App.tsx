import "./App.scss";
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BaseUrlConfigurator from "@views/BaseUrlConfigurator";
import { useAppSelector } from "@redux/store";
import VIew1 from "@views/VIew1";
import Login from "@views/login/Login";
import useSocket from "@hooks/useSocket";
import { UseSocket } from "@models/common";
import useUserMethod from "@hooks/useUserMethod";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { isPropEmpty } from "@shared/utilfunctions";

function App() {
  const [loading, setLoading] = useState(false);
  const socket: UseSocket = useSocket();
  const apiInfo = useAppSelector((state) => state?.http);
  const userVar = useAppSelector((state) => state?.user);
  const userInfo = useAppSelector((state) => state.user);
  const userMethod = useUserMethod();
  const dybaseConfigurator = new DyBaseUrlConfigurator();

  const Loader = () => (
    <div
      className="pos-a flex align-items-center justify-content-center wp-100 hp-100"
      style={{
        top: "0",
        left: "0",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: "100",
        color: "white",
      }}
    >
      <span style={{ fontSize: "30px" }}>Loading ...</span>
    </div>
  );

  const onLogoutClick = () => {
    userMethod.logout();
  };

  const getSocketStatusAndShowLogout = () => {
    return (
      <div className="flex align-items-center justify-content-between">
        <p className="fsr-20">
          {socket.isConnected ? "Socket Connected" : "Socket Disconnected"}
        </p>
        <button onClick={onLogoutClick}>Logout</button>
      </div>
    );
  };

  useEffect(() => {
    setLoading(apiInfo?.loading);
  }, [apiInfo]);

  useEffect(() => {
    if (userInfo?.userLoggedIn) {
      console.log("Trying socket connections....");
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
