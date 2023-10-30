import React from "react";
import { useDispatch } from "react-redux";
import { getJSDocReturnType } from "typescript";
import { AppDispatch } from "../redux/store";

interface MyService {
  someMethod: (dispatch: AppDispatch) => void;
}

const useServiceInjector = (service: any): ReturnType<typeof service> => {
  const dispatch: AppDispatch = useDispatch();

  return new service(dispatch);
};

export default useServiceInjector;
