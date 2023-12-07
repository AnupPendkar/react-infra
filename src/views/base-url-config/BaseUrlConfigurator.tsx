import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserMethod from "@hooks/useUserMethod";
import DyBaseUrlConfigurator from "@shared/dyBaseUrlConfigurator";

const BaseUrlConfigurator = () => {
  const navigate = useNavigate();
  const userMethod = useUserMethod();
  const dyBaseUrlConfigurator = new DyBaseUrlConfigurator();

  const logout = () => {
    userMethod.logout();
  };

  useEffect(() => {
    dyBaseUrlConfigurator.invokePrompt().then((res) => {
      if (res) {
        logout();
        navigate("/");
      }
    });
  });

  return <div></div>;
};

export default BaseUrlConfigurator;
