import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setUserInfo } from "../redux/userSlice";
import DyBaseUrlConfigurator from "../shared/dyBaseUrlConfigurator";
import useHttp from "./useHttp";

const useUserMethod = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const http = useHttp();
  const dybaseConfigurator = new DyBaseUrlConfigurator();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(setUserInfo({ status: false }));
    navigate("/");
    window.location.reload();
  };

  const login = (username: string, password: string) => {
    http
      .request("post", "/login", "", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res?.status === 200) {
          dybaseConfigurator.setAccesstoken = res?.data?.access;
          dybaseConfigurator.setRefreshtoken = res?.data?.refresh;
          dybaseConfigurator.setParsedTokenData();

          dispatch(
            setUserInfo({
              status: true,
              info: dybaseConfigurator.parsedUserInfo,
            })
          );

          navigate("/app");
        }
      });
  };

  return { login, logout };
};

export default useUserMethod;
