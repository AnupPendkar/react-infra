import { HttpResponse, ReqMetaData } from "../models/common";
import { makeRequest } from "../redux/axiosRequestslice";
import { useAppDispatch } from "../redux/store";


export default class HttpService {
  appDispatch = useAppDispatch();

  request(method: string, url: string, params: any, body = {}): Promise<any> {
    return new Promise((resolve) => {
      const requestPayload: ReqMetaData = {
        method,
        url,
        params: params,
        data: body,
      };

      this.appDispatch(makeRequest(requestPayload)).then((res) => {
        resolve(res?.payload as HttpResponse);
      });
    });
  }
}
