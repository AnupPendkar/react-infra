import { useNavigate } from "react-router-dom";
import { HttpResponse, ReqMetaData } from "@models/common";
import { useAppDispatch } from "@redux/store";
import useAuthMethods from "./useAuthMethods";
import { makeRequest } from "@redux/thunks/axiosRequestThunk";
import MessageBox from "@components/message-box/MessageBox";

const useHttp = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout } = useAuthMethods();
  
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
