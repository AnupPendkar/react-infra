import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStoreData = (reducerName:string) => {
  const [data, setData] = useState();
  const reducerData = useSelector((state:any) => state[reducerName]);

  useEffect(() => {
    setData(reducerData);
  }, [reducerData]);

  return data;
};

export default useStoreData;