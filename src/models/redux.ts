import { ParsedUserInfo } from "./common";

export interface GlobalUserVariables {
  userLoggedIn: boolean;
  parsedUserInfo: ParsedUserInfo | undefined;
  isSocketConnected: boolean;
}

export interface axiosState {
  loading: boolean;
  error: boolean;
}
