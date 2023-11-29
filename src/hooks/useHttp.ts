import { useNavigate } from "react-router-dom";
import { HttpResponse, ReqMetaData } from "@models/common";
import { makeRequest } from "@redux/axiosRequestslice";
import { useAppDispatch } from "@redux/store";
import useUserMethod from "./useUserMethod";

const useHttp = () => {
  const appDispatch = useAppDispatch();
  const userMethod = useUserMethod();
  const navigate = useNavigate();

  const request = (
    method: string,
    url: string,
    params: any,
    body = {}
  ): Promise<any> => {
    return new Promise((resolve) => {
      const requestPayload: ReqMetaData = {
        method,
        url,
        params: params,
        data: body,
      };

      appDispatch(makeRequest(requestPayload)).then((res) => {
        if ((res?.payload as HttpResponse)?.status === 401) {
          userMethod.logout();
          navigate("/");
          return;
        }

        resolve(res?.payload as HttpResponse);
      });
    });
  };

  return { request };
};

export default useHttp;
