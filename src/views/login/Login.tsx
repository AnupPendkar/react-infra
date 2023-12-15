import "./login.scss";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { getHashedString } from "@shared/utilfunctions";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useHttp from "@hooks/useHttp";
import { useAppSelector } from "@redux/store";
import useAuthMethods from "@hooks/useAuthMethods";
import useBasicFunctionality from "@hooks/useSharedEssentials";
import { Button } from "@mui/material";

interface LoginFormInput {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { setUserLoginData } = useAuthMethods();
  const user = useAppSelector((state) => state.user);
  const http = useHttp();
  const basicFunctions = useBasicFunctionality();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .max(15, "Must be 15 characters or less"),
    password: Yup.string()
      .required("Required")
      .max(20, "Must be 20 characters or less"),
  });

  const onLoginClick = () => {
    http
      .request("post", "/login", "", {
        username: formik.values.username,
        password: getHashedString(formik.values.password),
      })
      .then((res) => {
        if (res?.status === 200) {
          setUserLoginData(res?.data?.access, res?.data?.refresh);
          navigate("/data-capture");
        } else {
          basicFunctions.handleErr(res);
        }
      });
  };

  const formik = useFormik<LoginFormInput>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => {
      onLoginClick();
    },
  });

  useEffect(() => {
    if (user.userLoggedIn) {
      navigate("/data-capture");
    }
  }, []);

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <span style={{ alignSelf: "center" }}>
            Please enter your credentials
          </span>
          <div className="field">
            <label className="field-label" htmlFor="username">
              Username:
            </label>
            <input
              className="field-input"
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="password">
              Password:
            </label>
            <input
              className="field-input"
              id="password"
              // type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <button
            disabled={!(formik.dirty && formik.isValid)}
            className="login-submit-btn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
