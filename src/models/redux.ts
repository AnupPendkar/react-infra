import { ParsedUserInfo } from "./common";

export interface GlobalUserVariables {
  userLoggedIn: boolean;
  parsedUserInfo: ParsedUserInfo | undefined;
}

export interface axiosState {
  loading: boolean;
  error: boolean;
}
