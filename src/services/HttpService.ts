import { makeRequest } from "../redux/axiosRequestslice";
import { useAppDispatch } from "../redux/store";

export interface ReqMetaData {
  method: string;
  url: string;
  params: string;
  body: any;
}
export default class HttpService {
  appDispatch = useAppDispatch();

  constructor() {}

  request(method: string, url: string, params = "", body = ""): Promise<any> {
    return new Promise((resolve) => {
      const requestPayload: ReqMetaData = {
        method,
        url,
        params,
        body,
      };

      this.appDispatch(makeRequest(requestPayload)).then((res) => {
        console.log(res)
        resolve(res?.payload);
      });
    });
  }
}
