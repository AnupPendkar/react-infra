import { useAppDispatch } from "@redux/store";
import { setUserInfo } from "@redux/userSlice";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";

const useUserMethod = () => {
  const dispatch = useAppDispatch();
  const dybaseConfigurator = new DyBaseUrlConfigurator();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(setUserInfo({ status: false }));
    window.location.reload();
  };

  const setUserLoginData = (access: string, refresh: string) => {
    dybaseConfigurator.setAccesstoken = access;
    dybaseConfigurator.setRefreshtoken = refresh;
    dybaseConfigurator.setParsedTokenData();

    dispatch(
      setUserInfo({
        status: true,
        info: dybaseConfigurator.parsedUserInfo,
      })
    );
  };

  return { setUserLoginData, logout };
};

export default useUserMethod;
