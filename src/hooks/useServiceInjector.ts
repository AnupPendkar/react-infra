import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const useServiceInjector = (service: any): ReturnType<typeof service> => {
  const dispatch: AppDispatch = useDispatch();

  return new service(dispatch);
};

export default useServiceInjector;
