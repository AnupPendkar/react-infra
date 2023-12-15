import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Sidebar = () => {
  const theme = useTheme();
  const onListClick = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
  };

  return (
    <div
      className="app-sidebar"
      style={{
        background: theme.palette.secondary.main,
        padding: "10px 13px",
      }}
    >
      <Box
        sx={{ width: "fit-content", height: "100%" }}
        role="presentation"
        onClick={onListClick()}
      >
        <List>
          {["Data capture", "Upload"].map((text, index) => (
            <ListItem
              className="mb-30 pointer flex"
              key={text}
              style={{
                width: 70,
                justifyContent: "center",
                textAlign: "center",
              }}
              disablePadding
            >
              <div className="flex col align-items-center justify-content-center">
                <IconButton
                  className="w-32 h-32"
                  style={{ background: theme.palette.success.main }}
                >
                  <InboxIcon style={{ width: 19, height: 19 }} />
                </IconButton>
                <span className="fsr-10 font-isb mt-6">{text}</span>
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;
