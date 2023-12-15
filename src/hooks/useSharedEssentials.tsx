import MessageBox from "@components/message-box/MessageBox";
import { HttpResponse, MessageIconTypeEnum } from "@models/common";
import React from "react";

const useSharedEssentials = () => {
  const handleErr = (err: HttpResponse) => {
    // return (
    //   <MessageBox
    //     dialogHeading="Oops!"
    //     dialogMessage={`Failed with server error code (${err.status})`}
    //     messageType={MessageIconTypeEnum.ERROR}
    //   />
    // );
  };

  return { handleErr };
};

export default useSharedEssentials;
