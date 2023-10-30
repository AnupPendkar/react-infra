import useServiceInjector from "../hooks/useServiceInjector";
import AxiosHttp from "../services/HttpService";
import SingletonService from "../services/SingletonService";

const VIew1 = () => {
  const http: AxiosHttp = useServiceInjector(AxiosHttp);
  const ss: SingletonService = useServiceInjector(SingletonService);

  const submitDetails = () => {
    http.request("get", "/todo1")?.then((res) => {
      ss.submitData();
      console.log("In view", res);
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
