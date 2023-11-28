import useHttp from "../hooks/useHttp";

const VIew1 = () => {
  const http = useHttp();

  const submitDetails = () => {
    http
      .request("get", "/warehouse/filter", {
        warehouse_id: "wh1",
      })
      ?.then((res) => {
        console.log(res);
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
