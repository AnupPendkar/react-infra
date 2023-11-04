import { makeRequest } from "../redux/axiosRequestslice";
import { useAppDispatch } from "../redux/store";

export interface ReqMetaData {
  method: string;
  url: string;
  params?: Object; // the request params argument eg 'userName=123&id=23'
  body?: any;
  loaderText?: string;
  loaderSubText?: string;
  headers?: object;
  options?: any;
}
export default class HttpService {
  appDispatch = useAppDispatch();

  constructor() {}

  request(method: string, url: string, params = "", body = ""): Promise<any> {
    return new Promise((resolve) => {
      const requestPayload: ReqMetaData = {
        method,
        url,
        params: {
          id: 1,
        },
        body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      this.appDispatch(makeRequest(requestPayload)).then((res) => {
        console.log(res);
        resolve(res?.payload);
      });
    });
  }
}
