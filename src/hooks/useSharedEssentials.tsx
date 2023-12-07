import MessageBox from "@components/message-box/MessageBox";
import { HttpResponse, MessageTypeEnum } from "@models/common";
import React from "react";

const useSharedEssentials = () => {
  const handleErr = (err: HttpResponse) => {
    return (
      <MessageBox
        dialogHeading="Oops!"
        dialogMessage={`Failed with server error code (${err.status})`}
        messageType={MessageTypeEnum.ERROR}
      />
    );
  };

  return { handleErr };
};

export default useSharedEssentials;
