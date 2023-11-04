import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import DyBaseUrlConfigurator from "../shared/dyBaseUrlConfigurator";

let baseUrl: string;
let axiosInstance: AxiosInstance;
const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();

function createAxiosInsFromApiUrl() {
  axiosInstance = axios.create({
    baseURL: baseUrl as string,
  });
}

function initBaseUrlAndCreateAxiosIns() {
  dyBaseUrlConfigurator.initBaseURLConfigurator();
  baseUrl = dyBaseUrlConfigurator.baseUrl as string;
  createAxiosInsFromApiUrl();
}

function getInitialState() {
  initBaseUrlAndCreateAxiosIns();
  return { baseUrl };
}

const baseUrlSlice = createSlice({
  name: "baseUrl",
  initialState: getInitialState(),
  reducers: {
    changeBaseUrl: (state, action: PayloadAction<string>) => {
      state.baseUrl = action.payload;
      axiosInstance.defaults.baseURL = state.baseUrl as string;
    },
  },
});

export const { changeBaseUrl } = baseUrlSlice.actions;
export { axiosInstance };
export default baseUrlSlice.reducer;
