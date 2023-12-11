import { userActiveAction, userDetailsAction } from "@redux/actions/userInfoActions";
import { useAppDispatch } from "@redux/store";
import UrlConfigManager from "@shared/urlConfigManager";

const useAuthMethods = () => {
  const dispatch = useAppDispatch();
  const urlConfigManager = new UrlConfigManager();

  const logout = () => {
    urlConfigManager.removeTokensFromLS();
    dispatch(userActiveAction(false));
  };

  const setUserLoginData = (access: string, refresh: string) => {
    urlConfigManager.setAccesstoken = access;
    urlConfigManager.setRefreshtoken = refresh;
    urlConfigManager.setParsedTokenData();

    dispatch(userDetailsAction(urlConfigManager.parsedUserInfo));
  };

  return { setUserLoginData, logout };
};

export default useAuthMethods;
