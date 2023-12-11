export enum WSEventNameEnum {
  // Meta events.
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CONNECTION_FAILED = "connect_failed",
  CONNECTION_ERROR = "connect_error",

  // warehouse solution namespace events.
  CARGO_PACKAGE_COUNT_LIVE_UPDATE_EVT = "cargo_response",
  GROUND_STACK_CELL_UPDATE = "cell_update",
  RACK_BASED_BIN_UPDATE = "bin_update",
  JOB_STOP = "job_stop",
}

export enum AppWebSocketNSPEnum {
  WS_NSP__GATE_DBD = "/gate-dashboard",
  WS_NSP__RAKE_DBD = "/rake-dashboard",
  WS_NSP__WAREHOUSE_DBD = "/warehouse-dashboard-live-updates",
}

export enum LsKeyNameEnum {
  ACCESS_TOKEN = "react__access_token",
  REFRESH_TOKEN = "react__refresh_token",
  ACTIVE_BASE_URL = "react__active_baseUrl",
  ORIGINAL_BASE_URL = "react__original_baseUrl",
}

export enum MessageTypeEnum {
  ERROR = 0,
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
}

export interface Environment {
  production: boolean;
  serverAddress: string;
  serverPort: string;
  baseUrl: string;
}

export interface UseSocket {
  disconnect: () => void;
  connect: () => void;
}

export interface HttpResponse {
  data: any;
  status: number;
  statusText: "string";
}

export interface ReqMetaData {
  method: string;
  url: string;
  params?: object; // the request params argument eg 'userName=123&id=23'
  data?: object;
  loaderText?: string;
  loaderSubText?: string;
  headers?: object;
  options?: any;
}

export interface ParsedUserInfo {
  username: string;
  id: number;
  description: string;
  role: string;
  permissions: Array<number>;
  tokenIssueEpoch: number;
  tokenExpEpoch: number;
  token: string;
}

export interface IJWTPayload {
  exp: number;
  iat: number;
  jti: string;
  token_type: "access" | "refresh";
  user_id: number;
  identity: {
    username: string;
    groups: Array<{
      description: string;
      id: number;
      is_active: boolean;
      name: string;
      permissions: Array<number>;
    }>;
  };
}
