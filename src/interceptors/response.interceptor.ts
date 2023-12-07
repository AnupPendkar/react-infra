import { axiosInstance } from "@redux/reducers/axiosReducer";

export const initResponseInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
