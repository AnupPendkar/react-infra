import { ThemePrefEnum } from "@models/common";
import { useMediaQuery } from "@mui/material";
import { changeThemePref } from "@redux/actions/userInfoActions";
import { useAppDispatch, useAppSelector } from "@redux/store";
import StorageHandler from "@shared/storageHandler";
import { isPropEmpty } from "@shared/utilfunctions";
import React from "react";

const useThemeSwitcher = () => {
  const { themePref } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { setThemePreference, getThemePreference } = new StorageHandler();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const setAppTheme = (theme: ThemePrefEnum) => {
    dispatch(changeThemePref(theme));
    setThemePreference(theme === ThemePrefEnum.DARK ? "dark" : "light");
  };

  const toggleAppTheme = () => {
    const defaultTheme =
      themePref === ThemePrefEnum.DARK
        ? ThemePrefEnum.LIGHT
        : ThemePrefEnum?.DARK;

    setAppTheme(defaultTheme);
  };

  const setDefaultAppTheme = () => {
    let defaultTheme: ThemePrefEnum;

    if (isPropEmpty(getThemePreference)) {
      defaultTheme = prefersDarkMode ? ThemePrefEnum.DARK : ThemePrefEnum.LIGHT;
    } else {
      defaultTheme =
        getThemePreference === "dark"
          ? ThemePrefEnum.DARK
          : ThemePrefEnum.LIGHT;
    }

    setAppTheme(defaultTheme);
  };

  return {
    setAppTheme,
    toggleAppTheme,
    setDefaultAppTheme,
  };
};

export default useThemeSwitcher;
