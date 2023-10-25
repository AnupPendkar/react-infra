import { useDispatch } from "react-redux";
import { makeRequest } from "../redux/axiosRequestslice";
import { AppDispatch } from "../redux/store";

export interface ReqMetaData {
  method: string;
  url: string;
  params: string;
  body: any;
}

const useHttp = () => {
  const dispatch: AppDispatch = useDispatch();

  function request(method: string, url: string, params = "", body = "") {
    return new Promise((resolve) => {
      const requestPayload: ReqMetaData = {
        method,
        url,
        params,
        body,
      };

      dispatch(makeRequest(requestPayload)).then((res) => {
        resolve(res?.payload);
      });
    });
  }

  return { request };
};

export default useHttp;
