import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { createAxiosInsFromBaseUrl } from "@redux/axiosRequestslice";

const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();
axios.get("assets/config.json").then((res) => {
  dyBaseUrlConfigurator.initBaseURLConfigurator(res?.data?.baseUrl);
  createAxiosInsFromBaseUrl(dyBaseUrlConfigurator.baseUrl as string);

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
