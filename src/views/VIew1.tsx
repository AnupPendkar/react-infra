import HttpService from "../services/HttpService";
import SingletonService from "../services/SingletonService";

const VIew1 = () => {
  const http = new HttpService();
  const ss = new SingletonService();

  const submitDetails = () => {
    http.request("get", "/todo1")?.then((res) => {
      ss.submitData();
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
