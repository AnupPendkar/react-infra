import { userActiveAction, userDetailsAction } from "@redux/actions/userInfoActions";
import { useAppDispatch } from "@redux/store";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";

const useUserMethod = () => {
  const dispatch = useAppDispatch();
  const dybaseConfigurator = new DyBaseUrlConfigurator();

  const logout = () => {
    dybaseConfigurator.removeTokensFromLS();
    dispatch(userActiveAction(false));
  };

  const setUserLoginData = (access: string, refresh: string) => {
    dybaseConfigurator.setAccesstoken = access;
    dybaseConfigurator.setRefreshtoken = refresh;
    dybaseConfigurator.setParsedTokenData();

    dispatch(userDetailsAction(dybaseConfigurator.parsedUserInfo));
  };

  return { setUserLoginData, logout };
};

export default useUserMethod;
