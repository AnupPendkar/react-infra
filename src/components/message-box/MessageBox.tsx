import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { MessageTypeEnum } from "@models/common";
import "./messageBox.scss";

interface MessageBoxProps {
  dialogHeading: string;
  dialogMessage: string;
  messageType: MessageTypeEnum;
}

const MessageBox = (props: MessageBoxProps) => {
  const [messageType, setMessageType] = useState<MessageTypeEnum>();
  const [dialogHeading, setDialogHeading] = useState<string>();
  const [dialogMessage, setDialogMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
  };

  const MessageIcon = () => {
    switch (messageType) {
      case MessageTypeEnum.SUCCESS:
        return <CheckCircleOutlinedIcon />;

      case MessageTypeEnum.INFO:
        return <InfoOutlinedIcon />;

      case MessageTypeEnum.ERROR:
        return <DangerousOutlinedIcon />;

      case MessageTypeEnum.WARNING:
        return <ReportGmailerrorredIcon />;

      default:
        return <InfoOutlinedIcon />;
    }
  };

  useEffect(() => {
    setMessageType(props.messageType);
    setDialogMessage(props.dialogMessage);
    setDialogHeading(props.dialogHeading);
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="flex align-items-center">
        <MessageIcon />
        <span className="fsr-22 font-isb ml-10">{dialogHeading}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMessage}</DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default MessageBox;
