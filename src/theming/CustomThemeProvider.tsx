import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { CustomTheme } from "./customTheme";
import { useAppSelector } from "@redux/store";
import useThemeSwitcher from "@hooks/useThemeSwitcher";
import { styled } from "@mui/system";

type MyThemeProviderProps = {
  children: React.ReactNode;
};

const MyThemeComponent = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const CustomThemeProvider = (props: MyThemeProviderProps) => {
  const { themePref } = useAppSelector((state) => state.user);
  const { setDefaultAppTheme } = useThemeSwitcher();

  const customTheme = useMemo(
    () => createTheme(themePref === 0 ? CustomTheme?.dark : CustomTheme?.light),
    [themePref]
  );

  useEffect(() => {
    setDefaultAppTheme();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles styles={{}} />
      <CssBaseline enableColorScheme />
      {props.children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
