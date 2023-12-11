import axios, { AxiosInstance } from "axios";
import { createReducer } from "@reduxjs/toolkit";
import { axiosState } from "@models/redux";
import { makeRequest } from "@redux/thunks/axiosRequestThunk";
import { initRequestInterceptor } from "@interceptors/request.interceptor";
import { initResponseInterceptor } from "@interceptors/response.interceptor";

let axiosInstance: AxiosInstance;

function initAxiosInterceptors() {
  initRequestInterceptor();
  initResponseInterceptor();
}

function createAxiosInsFromBaseUrl(baseUrl: string) {
  axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000
  });

  initAxiosInterceptors();
}

const initialState: axiosState = {
  loading: false,
  error: false,
};

const axiosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(makeRequest.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(makeRequest.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    })
    .addCase(makeRequest.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
});

export { createAxiosInsFromBaseUrl };
export { axiosInstance };
export default axiosReducer;
