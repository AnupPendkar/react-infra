import React from "react";
import useHttp from "@hooks/useHttp";
import useBasicFunctionality from "@hooks/useSharedEssentials";

const VIew1 = () => {
  const http = useHttp();
  const basicFunctions = useBasicFunctionality();

  const submitDetails = () => {
    http
      .request("get", "/warehouse/filter", {
        warehouse_id: "wh1",
      })
      ?.then((res) => {
        if (res?.status === 200) {
          console.log(res);
          basicFunctions.handleErr(res);
        } else {
        }
      });
  };

  return (
    <div>
      <span>view 1</span>
      <button onClick={submitDetails}>View Button</button>
    </div>
  );
};

export default VIew1;
