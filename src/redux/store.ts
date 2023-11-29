import { configureStore } from "@reduxjs/toolkit";
import axiosRequest from "./axiosRequestslice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    http: axiosRequest,
    user: userSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const storeReducers = store.getState();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppNavigate = () => useNavigate();
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector<RootState>;
