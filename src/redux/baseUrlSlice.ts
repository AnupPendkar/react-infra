import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DyBaseUrlConfigurator from "../shared/dyBaseUrlConfigurator";
import { createAxiosInsFromBaseUrl } from "./axiosRequestslice";

let baseUrl: string;
const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();

function initBaseUrlAndCreateAxiosIns() {
  dyBaseUrlConfigurator.initBaseURLConfigurator();
  baseUrl = dyBaseUrlConfigurator.baseUrl as string;
  createAxiosInsFromBaseUrl(baseUrl);
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
    },
  },
});

export const { changeBaseUrl } = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
