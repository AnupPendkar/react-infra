import { PopupActionEnum } from "@models/common";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface CreateNewRailPopupType {
  emitter: (action: PopupActionEnum) => void;
}

const CreateNewRailPopup = ({ emitter }: CreateNewRailPopupType) => {
  const [open, setOpen] = useState(true);

  const onCancelClick = () => {
    emitter(PopupActionEnum.CANCEL);
    setOpen(false);
  };

  const onConfirmClick = () => {
    emitter(PopupActionEnum.SUBMIT);
    setOpen(false);
  };

  const theme = useTheme();

  useEffect(() => {
    console.log("rail popup");
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} color="primary">
      <DialogTitle className="flex align-items-center">
        <span className="fsr-22 font-isb">Create New</span>
      </DialogTitle>
      <DialogContent>
        <div className="flex align-items-center mb-25">
          <span className="fsr-16 font-im">Rail number: </span>

          <TextField
            className="ml-15"
            id="rail-no"
            variant="outlined"
            size="small"
          />
        </div>

        <DialogActions style={{ padding: 0 }}>
          <Button color="success" onClick={onCancelClick} variant="contained">
            Cancel
          </Button>
          <Button color="success" onClick={onConfirmClick} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewRailPopup;
