import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useAppSelector } from "@redux/store";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useThemeSwitcher from "@hooks/useThemeSwitcher";
import useAuthMethods from "@hooks/useAuthMethods";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isSocketConnected } = useAppSelector((state) => state.user);
  const { toggleAppTheme } = useThemeSwitcher();
  const theme = useTheme();
  const { logout } = useAuthMethods();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="app-header">
      <AppBar position="static" color="ternary">
        <Toolbar className="flex align-items-center justify-content-between">
          <img
            className="h-55 w-55"
            src="/assets/images/atco.svg"
            alt="ATCO logo"
          />

          <span className="fsr-18 font-im ml-30">Dashboard</span>

          <div className="flex align-items-center">
            <IconButton
              className="mr-15"
              sx={{ ml: 1 }}
              onClick={toggleAppTheme}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>

            <img
              className="w-16 h-16 mr-15"
              src={
                isSocketConnected
                  ? "/assets/images/connectect_icon.svg"
                  : "/assets/images/disconnected.svg"
              }
            />

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <span className="fsr-22 font-isb">Manage account</span>
              </MenuItem>
              <MenuItem onClick={logout}>
                <span className="fsr-22 font-isb">Logout</span>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
