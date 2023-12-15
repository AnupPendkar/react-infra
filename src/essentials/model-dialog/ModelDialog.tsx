import MessageBox from "@components/message-box/MessageBox";
import {
  MessageBoxProps,
  MessageBoxTypeEnum,
  MessageIconTypeEnum,
} from "@models/common";
import React from "react";

const ModelDialog = () => {
  const dialogDetails: MessageBoxProps[] = [
    // {
    //   type: MessageBoxTypeEnum.MESSAGE_BOX,
    //   iconType: MessageIconTypeEnum.ERROR,
    //   title: "Oops!",
    //   content: "Failed with serve error code (500) sdfsdgdfghhgfhfghgf",
    //   confirmMsg: "Confirm",
    //   closeMsg: "Close",
    // },
    // {
    //   type: MessageBoxTypeEnum.MESSAGE_BOX,
    //   title: "Oops!",
    //   content: "Failed with serve ",
    //   confirmMsg: "Confirm",
    //   closeMsg: "Close",
    // },
  ];

  return (
    <div>
      {dialogDetails?.map((dialog, idx) => (
        <MessageBox key={idx} dialogDetails={dialog} />
      ))}
    </div>
  );
};

export default ModelDialog;
