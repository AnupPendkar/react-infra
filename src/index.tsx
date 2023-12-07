import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { createAxiosInsFromBaseUrl } from "@redux/reducers/axiosReducer";

const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();
const resolveConfigJsonFile = (): Promise<void> => {
  return new Promise((resolve) => {
    axios.get("assets/config.json").then((res) => {
      dyBaseUrlConfigurator.initBaseURLConfigurator(res?.data?.baseUrl);
      createAxiosInsFromBaseUrl(dyBaseUrlConfigurator.baseUrl as string);
      resolve();
    });
  });
};

resolveConfigJsonFile()?.then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
