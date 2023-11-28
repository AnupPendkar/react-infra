import "./App.scss";
import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BaseUrlConfigurator from "./views/BaseUrlConfigurator";
import { useAppSelector } from "./redux/store";
import VIew1 from "./views/VIew1";
import Login from "./views/login/Login";
import useSocket from "./hooks/useSocket";
import { UseSocket } from "./models/common";

function App() {
  const [loading, setLoading] = useState(false);
  const socket: UseSocket = useSocket();
  const apiInfo = useAppSelector((state) => state?.http);
  const userVar = useAppSelector((state) => state?.user);
  const userInfo = useAppSelector((state) => state.user);

  const Loader = () => (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: "100",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: "30px" }}>Loading ...</span>
    </div>
  );

  useEffect(() => {
    console.log("loading useEffect");
    setLoading(apiInfo?.loading);
  }, [apiInfo]);

  useEffect(() => {
    console.log("socket");
    if (userInfo?.userLoggedIn) {
      console.log("logged in");
      socket.connect();
    }
  }, [userInfo]);

  return (
    <Router>
      <div className="App">
        {socket.isConnected ? "Socket Connected" : "Socket Disconnected"}
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
          <Route path="/app" Component={VIew1} />
          <Route path="/config" Component={BaseUrlConfigurator} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
