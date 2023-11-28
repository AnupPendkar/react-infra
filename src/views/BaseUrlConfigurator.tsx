import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeBaseUrl } from "../redux/baseUrlSlice";
import DyBaseUrlConfigurator from "../shared/dyBaseUrlConfigurator";

const BaseUrlConfigurator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();

  useEffect(() => {
    dyBaseUrlConfigurator.invokePrompt().then((res) => {
      if (res) {
        dispatch(changeBaseUrl(dyBaseUrlConfigurator.baseUrl as string));
        navigate("/");
        dyBaseUrlConfigurator.reloadWindow();
      } else {
        navigate("/");
      }
    });
  });

  return <div></div>;
};

export default BaseUrlConfigurator;
