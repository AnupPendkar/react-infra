import { axiosInstance } from "@redux/reducers/axiosReducer";
import StorageHandler from "@shared/storageHandler";
import UrlConfigManager from "@shared/urlConfigManager";
import { isPropEmpty } from "@shared/utilfunctions";

const storageHandler = new StorageHandler();

export const initRequestInterceptor = () => {
  axiosInstance.interceptors.request.use(
    (res) => {
      if (!isPropEmpty(storageHandler.jwtAccesToken)) {
        res.headers["Authorization"] =
          `Bearer ${storageHandler.jwtAccesToken}`;
      }
      return res;
    },
    (error) => {
      console.log("request", error);
      return Promise.reject(error);
    }
  );
};
