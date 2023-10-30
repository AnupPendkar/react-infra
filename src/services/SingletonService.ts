import { AppDispatch } from "../redux/store";

export default class SingletonService {
  hook: any;

  constructor(dispatch: AppDispatch) {}

  submitData() {
    console.log("data submitted.");
  }
}
