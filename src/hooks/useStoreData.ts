import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Reducer } from "@reduxjs/toolkit";

const useStoreData = (reducerName: string) => {
  const [data, setData] = useState<any>();
  const reducerData = useSelector((state: any) => state[reducerName]);

  useEffect(() => {
    setData(reducerData);
  }, [reducerData]);

  return data;
};

export default useStoreData;
