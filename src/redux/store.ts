import { configureStore } from "@reduxjs/toolkit";
import axiosRequest, { axiosState } from "./axiosRequestslice";
import baseUrlSlice from "./baseUrlSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export interface ReducerStates {
  http: axiosState;
  baseUrl: string;
}

export const store = configureStore({
  reducer: {
    http: axiosRequest,
    baseUrl: baseUrlSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const storeReducers = store.getState();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector<RootState>;
