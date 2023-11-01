import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseUrlConfigurator from "./views/BaseUrlConfigurator";
import { useAppSelector } from "./redux/store";
import VIew1 from "./views/VIew1";

function App() {
  const [loading, setLoading] = useState(false);
  const storeData = useAppSelector((state) => state?.http);

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
    setLoading(storeData?.loading);
  }, [storeData]);

  return (
    <Router>
      <div className="App">
        {loading && <Loader />} {/* Loader */}
        <Routes>
          <Route path="/app" Component={VIew1} />
          <Route path="/config" Component={BaseUrlConfigurator} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
