import "./App.css";
import { useEffect, useState } from "react";
import useStoreData from "./hooks/useStoreData";
import useHttp from "./hooks/useHttp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseUrlConfigurator from "./views/BaseUrlConfigurator";

function App() {
  const [loading, setLoading] = useState(false);
  const storeData = useStoreData("http");
  const http = useHttp();
  
  function submitData(){
    http.request('get', '/crud').then((res)=>{
      console.log(res);
    })
  }

  useEffect(() => {
    setLoading(storeData?.loading);
  }, [storeData]);

  return (
    <Router>
    <div className="App">
      {loading && <span>Loading...</span>}
      <span>hello</span>
      <button onClick={submitData}>submit</button>
      <Routes>
        <Route path="/config"  Component={BaseUrlConfigurator} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
