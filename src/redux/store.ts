import { configureStore } from "@reduxjs/toolkit";
import axiosRequest from "./axiosRequestslice";
import baseUrlSlice from "./baseUrlSlice";

export const store = configureStore({
  reducer: {
    http: axiosRequest,
    baseUrl: baseUrlSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
