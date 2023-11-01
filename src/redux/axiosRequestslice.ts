import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReqMetaData } from "../services/HttpService";
import { axiosInstance } from "./baseUrlSlice";
export interface axiosState {
  loading: boolean;
  error: boolean;
}

export const makeRequest = createAsyncThunk(
  "Request",
  async (param: ReqMetaData, { rejectWithValue }) => {
    const axiosConfig = {
      method: param.method,
      url: param.url,
      data: param?.body,
    };

    try {
      const response = await axiosInstance(axiosConfig);
      return response;
    } catch (err) {
      rejectWithValue("Failed to fetch issues.");
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

export default axiosRequest.reducer;
