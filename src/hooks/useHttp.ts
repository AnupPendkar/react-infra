import { useNavigate } from "react-router-dom";
import { HttpResponse, ReqMetaData } from "../models/common";
import { makeRequest } from "../redux/axiosRequestslice";
import { useAppDispatch } from "../redux/store";
import { setUserInfo } from "../redux/userSlice";

const useHttp = () => {
  const appDispatch = useAppDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(setUserInfo({ status: false }));
    navigate("/");
    window.location.reload();
  };

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
          logout();
          return;
        }

        resolve(res?.payload as HttpResponse);
      });
    });
  };

  return { request };
};

export default useHttp;
