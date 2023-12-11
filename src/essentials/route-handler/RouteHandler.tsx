import { useAppSelector } from "@redux/store";
import VIew1 from "@views/VIew1";
import BaseUrlConfigurator from "@views/base-url-config/BaseUrlConfigurator";
import Login from "@views/login/Login";
import React from "react";
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

const RouteHandler = () => {

  const AuthGuard = () => {
    return userLoggedIn ? <Outlet /> : <Navigate to="/login" />
  };

  const { userLoggedIn } = useAppSelector((state) => state.user);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/config" element={<BaseUrlConfigurator />} />

        <Route element={<AuthGuard />} >
          <Route path="/" element={!userLoggedIn ? (<Navigate to="/login" />) : (<Navigate to="/app" />)} />
          <Route path="/app" element={<VIew1 />} />
        </Route>

      </Routes>
    </HashRouter>
  );
};

export default RouteHandler;
