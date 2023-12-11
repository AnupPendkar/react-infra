import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import UrlConfigManager from "@shared/urlConfigManager";
import { createAxiosInsFromBaseUrl } from "@redux/reducers/axiosReducer";

const urlConfigManager = new UrlConfigManager();
const resolveConfigJsonFile = (): Promise<void> => {
  return new Promise((resolve) => {
    axios.get("assets/config.json").then((res) => {
      urlConfigManager.initBaseURLConfigurator(res?.data?.baseUrl);
      createAxiosInsFromBaseUrl(urlConfigManager.baseUrl as string);
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
