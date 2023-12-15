import { useTheme } from "@mui/material";
import { useAppSelector } from "@redux/store";
import VIew1 from "@views/VIew1";
import BaseUrlConfigurator from "@views/base-url-config/BaseUrlConfigurator";
import DataCaptureView from "@views/data-capture-view/DataCaptureView";
import Login from "@views/login/Login";
import React from "react";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

const RouteHandler = () => {
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const theme = useTheme();

  const AuthGuard = () => {
    return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <div
      className="app-main"
      style={{ background: theme.palette.primary.main }}
    >
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/config" element={<BaseUrlConfigurator />} />

          <Route element={<AuthGuard />}>
            <Route
              path="/"
              element={
                !userLoggedIn ? (
                  <Navigate to="/login" />
                ) : (
                  <Navigate to="/data-capture" />
                )
              }
            />
            <Route path="/data-capture" element={<DataCaptureView />} />
            <Route path="/app" element={<VIew1 />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default RouteHandler;
