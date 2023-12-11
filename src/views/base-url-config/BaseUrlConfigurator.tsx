import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthMethods from "@hooks/useAuthMethods";
import UrlConfigManager from "@shared/urlConfigManager";

const BaseUrlConfigurator = () => {
  const navigate = useNavigate();
  const {logout} = useAuthMethods();
  const urlConfigManager = new UrlConfigManager();

  useEffect(() => {
    urlConfigManager.invokePrompt().then((res) => {
      if (res) {
        logout();
        navigate("/");
      }
    });
  });

  return <div></div>;
};

export default BaseUrlConfigurator;
