import { useAppSelector } from "@redux/store";
import Login from "@views/login/Login";

const CustomRouteNavigator = (currentComponent: any): any => {
  console.log(currentComponent);
  const userLoggedInStatus = useAppSelector(
    (state) => state.user
  )?.userLoggedIn;

  return userLoggedInStatus ? currentComponent?.component : Login;
};

export default CustomRouteNavigator;
