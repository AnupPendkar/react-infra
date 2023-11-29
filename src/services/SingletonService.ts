import { useAppDispatch } from "@redux/store";

export default class SingletonService {
  hook: any;
  appDispatch = useAppDispatch();
}
