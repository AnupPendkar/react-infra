import { ReqMetaData } from "@models/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../reducers/axiosReducer";

export const makeRequest = createAsyncThunk(
  "Request",
  async (param: ReqMetaData) => {
    const axiosConfig = { ...param };

    try {
      const response = await axiosInstance(axiosConfig);
      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
    } catch (err: any) {
      return {
        data: err?.response?.data,
        status: err?.response?.status,
        statusText: err?.response?.statusText,
      };
    }
  }
);
