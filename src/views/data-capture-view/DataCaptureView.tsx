import { Button } from "@mui/material";
import React, { useState } from "react";
import CreateNewRailPopup from "./create-new-rail-popup/CreateNewRailPopup";
import { PopupActionEnum } from "@models/common";

const DataCaptureView = () => {
  const [isDataCaptureClick, setDataCaptureClick] = useState(false);

  const popupActionEmitter = (action: PopupActionEnum) => {
    console.log(action);
    setDataCaptureClick(false);
  };

  const onDataCaptureClick = () => {
    setDataCaptureClick(() => true);
  };

  return (
    <div className="data-capture wp-100 hp-100 flex align-items-center justify-content-center">
      <div className="pos-r">
        <img src="/assets/images/camera.svg" />
        <Button
          onClick={onDataCaptureClick}
          color="success"
          variant="contained"
          style={{
            position: "absolute",
            top: "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "max-content",
          }}
        >
          Start Capture
        </Button>

        {isDataCaptureClick && (
          <CreateNewRailPopup emitter={popupActionEmitter} />
        )}
      </div>
    </div>
  );
};

export default DataCaptureView;
