import { useEffect, useState } from "react";
import "./App.css";
import api_config from "./config/api.json";
import XM from "./components/xm";

interface api {
  api_name: string;
  api: string;
  method: string;
  url: string;
  path: string;
  query: {};
  open: {
    code: boolean;
    message: string;
  };
}

function App() {
  const api_baseuel =
    "http://" + api_config.app.api_host + ":" + api_config.app.api_port;
  const api_list = api_config.apis;
  const [targetApi, setTargetApi] = useState({
    api_name: "",
    api: "",
    method: "",
    url: "",
    path: "",
    query: {},
    open: {
      code: true,
      message: "接口开放",
    },
  });
  useEffect(() => {
    if (targetApi.open.code === false) {
      alert(targetApi.open.message);
    }
  }, [targetApi]);
  return (
    <div className="App">
      <div className="main">
        <h1>👴的小接口</h1>
        <div className="card">
          {api_list.map((item, index, items) => (
            <div
              key={item.api}
              className="card-item"
              onClick={() => {
                setTargetApi(() => {
                  return items[index];
                });
              }}
            >
              {item.api_name}
            </div>
          ))}
        </div>
        <p className="read-the-docs">Powered By Vangogh</p>
      </div>
      <div
        className="side"
        style={{
          display:
            targetApi.open.code === false || targetApi.api_name === ""
              ? "none"
              : "block",
        }}
      >
        <div className="card">
          {targetApi.api_name === "小米步数" && <XM targetApi={targetApi}></XM>}
        </div>
      </div>
    </div>
  );
}

export default App;
export type { api };
