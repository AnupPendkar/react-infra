import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./baseUrlSlice";
import { ReqMetaData } from "../hooks/useHttp";

interface axiosState {
  loading: boolean;
  error: any;
}

export const makeRequest = createAsyncThunk(
  "Request",
  async (param: ReqMetaData, { rejectWithValue }) => {
    const axiosConfig = {
      method: param?.method,
      url: param?.url,
      data: param?.body,
    };

    try {
      const response = await axiosInstance(axiosConfig);
      return response;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const initialState: axiosState = {
  loading: false,
  error: null,
};

const axiosRequest = createSlice({
  name: "axios request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(makeRequest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default axiosRequest.reducer;
