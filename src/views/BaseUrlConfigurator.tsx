import React, { useEffect } from "react";
import { changeBaseUrl } from "../redux/baseUrlSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BaseUrlConfigurator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl: string | null = localStorage.getItem("activeBaseUrl");
    const promptData = prompt(
      "Enter a url",
      baseUrl ?? `http://127.0.0.0:8005/api`
    );
    dispatch(changeBaseUrl(promptData));
    navigate("/");
  }, []);

  return <div></div>;
};

export default BaseUrlConfigurator;
