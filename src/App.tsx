import "./App.scss";
import React from "react";
import Loader from "@components/loader/Loader";
import RouteHandler from "./essentials/route-handler/RouteHandler";
import useAppEffects from "@hooks/useAppEffects";
import Header from "@components/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import Footer from "@components/footer/Footer";
import ModelDialog from "./essentials/model-dialog/ModelDialog";
import { useAppSelector } from "@redux/store";

function App() {
  useAppEffects();
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state?.http);

  return (
    <div className="App">
      {loading && <Loader />} {/* Loader */}
      {/* ------------------------------------------------------------------ */}
      {userLoggedIn && (
        <>
          <Header />
          <Sidebar />
          <Footer />
        </>
      )}
      <RouteHandler />
      {/* ------------------------------------------------------------------ */}
      <ModelDialog />
    </div>
  );
}

export default App;
