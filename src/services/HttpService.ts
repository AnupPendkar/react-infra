import { makeRequest } from "../redux/axiosRequestslice";
import { AppDispatch } from "../redux/store";

export interface ReqMetaData {
  method: string;
  url: string;
  params: string;
  body: any;
}

export default class HttpService {
  dispatch!: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  request(method: string, url: string, params = "", body = ""): Promise<any> {
    return new Promise((resolve) => {
      const requestPayload: ReqMetaData = {
        method,
        url,
        params,
        body,
      };

      this.dispatch(makeRequest(requestPayload)).then((res) => {
        resolve(res?.payload);
      });
    });
  }
}
