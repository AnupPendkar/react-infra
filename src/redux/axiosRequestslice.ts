import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { axiosState, ReqMetaData } from "../models/common";
import DyBaseUrlConfigurator from "../shared/dyBaseUrlConfigurator";
import { isPropEmpty } from "../shared/utilfunctions";

let axiosInstance: AxiosInstance;
const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();

function requestAxiosInterceptors() {
  axiosInstance.interceptors.request.use(
    (res) => {
      if (!isPropEmpty(dyBaseUrlConfigurator.jwtAccesToken)) {
        res.headers[
          "Authorization"
        ] = `Bearer ${dyBaseUrlConfigurator.jwtAccesToken}`;
      }
      return res;
    },
    (error) => {
      console.log("request", error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function createAxiosInsFromBaseUrl(baseUrl: string) {
  axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  requestAxiosInterceptors();
}

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

const initialState: axiosState = {
  loading: false,
  error: false,
};

const axiosRequest = createSlice({
  name: "axios request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(makeRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(makeRequest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export { createAxiosInsFromBaseUrl };
export { axiosInstance };
export default axiosRequest.reducer;
