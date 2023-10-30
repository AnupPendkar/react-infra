import { request } from "http";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeRequest } from "../redux/axiosRequestslice";
import { AppDispatch } from "../redux/store";
import AxiosHttp from "../services/HttpService";

export interface ReqMetaData {
  method: string;
  url: string;
  params: string;
  body: any;
}

const useHttp = () => {
  const dispatch: AppDispatch = useDispatch();

  function request(method: string, url: string, params = "", body = "") {
    const reqMetaData: ReqMetaData = {
      method,
      url,
      params,
      body,
    };
  }

  return { request };
};

export default useHttp;
