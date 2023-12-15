import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { MessageBoxProps, MessageIconTypeEnum } from "@models/common";
import "./messageBox.scss";

const MessageBox = ({ dialogDetails }: { dialogDetails: MessageBoxProps }) => {
  // const [messageType, setMessageType] = useState<MessageIconTypeEnum>();
  // const [dialogHeading, setDialogHeading] = useState<string>();
  // const [dialogMessage, setDialogMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
  };

  const MessageIcon = () => {
    switch (dialogDetails?.iconType) {
      case MessageIconTypeEnum.SUCCESS:
        return <CheckCircleOutlinedIcon />;

      case MessageIconTypeEnum.INFO:
        return <InfoOutlinedIcon />;

      case MessageIconTypeEnum.ERROR:
        return <DangerousOutlinedIcon />;

      case MessageIconTypeEnum.WARNING:
        return <ReportGmailerrorredIcon />;

      default:
        return <InfoOutlinedIcon />;
    }
  };

  useEffect(() => {
    // setMessageType(props.messageType);
    // setDialogMessage(props.dialogMessage);
    // setDialogHeading(props.dialogHeading);
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="flex align-items-center">
        <IconButton className="pl-0" color="error">
          <MessageIcon />
        </IconButton>
        <span className="fsr-22 font-isb">{dialogDetails?.title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogDetails?.content}</DialogContentText>
        <DialogActions>
          {dialogDetails?.closeMsg && (
            <Button color="success" onClick={handleClose} variant="contained">
              {dialogDetails?.closeMsg}
            </Button>
          )}

          <Button color="success" onClick={handleClose} variant="contained">
            {dialogDetails?.confirmMsg}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default MessageBox;
