import { axiosInstance } from "@redux/reducers/axiosReducer";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";
import { isPropEmpty } from "@shared/utilfunctions";

const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();

export const initRequestInterceptor = () => {
  axiosInstance.interceptors.request.use(
    (res) => {
      if (!isPropEmpty(dyBaseUrlConfigurator.jwtAccesToken)) {
        res.headers["Authorization"] =
          `Bearer ${dyBaseUrlConfigurator.jwtAccesToken}`;
      }
      return res;
    },
    (error) => {
      console.log("request", error);
      return Promise.reject(error);
    }
  );
};
