import { useAppSelector } from "@redux/store";
import VIew1 from "@views/VIew1";
import BaseUrlConfigurator from "@views/base-url-config/BaseUrlConfigurator";
import Login from "@views/login/Login";
import React from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

const RouteHandler = () => {
  const userVar = useAppSelector((state) => state?.user);
  const userInfo = useAppSelector((state) => state.user);

  return (
    <HashRouter>
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
    </HashRouter>
  );
};

export default RouteHandler;
