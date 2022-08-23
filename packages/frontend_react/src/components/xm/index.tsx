import axios from "axios";
import { api } from "../../App";
import { app } from "../../config/api.json";
import "./index.css";

function xm(props: { targetApi: api }) {
  return (
    <>
      <h5>{props.targetApi.api_name}</h5>
      <div className="form-box">
        <input type="text" placeholder="请输入小米运动账号" id="user" />
        <input type="password" placeholder="请输入小米运动密码" id="pass" />
        <input
          type="number"
          placeholder="请输入步数"
          id="step"
          style={{ marginBottom: 0 }}
          onInput={(ev) => {
            (ev.target as HTMLInputElement).value = (
              ev.target as HTMLInputElement
            ).value.replace(/[^\d]/g, "");
            if (+(ev.target as HTMLInputElement).value > 99999) {
              (ev.target as HTMLInputElement).value = "99999";
            }
            if (!(ev.target as HTMLInputElement).value) {
              (
                document.querySelector(".step-tips") as HTMLElement
              ).style.display = "block";
            } else {
              (
                document.querySelector(".step-tips") as HTMLElement
              ).style.display = "none";
            }
          }}
        />
        <span
          style={{
            fontSize: 12,
            color: "rgb(255 255 255 / 59%)",
            display: "block",
          }}
          className="step-tips"
        >
          (留空,将在[28000, 35000]区间内随机提交步数)
        </span>
      </div>
      <button
        style={{ fontSize: 12, width: 80, margin: "10px auto" }}
        onClick={async () => {
          const url =
            "http://" +
            app.api_host +
            ":" +
            app.api_port +
            props.targetApi.path;
          const user = (document.getElementById("user") as HTMLInputElement)
            .value;
          const pass = (document.getElementById("pass") as HTMLInputElement)
            .value;
          const step = (document.getElementById("step") as HTMLInputElement)
            .value;

          const { data } = await axios.get(url, {
            params: {
              user,
              pass,
              step,
            },
          });
          alert(data.message);
        }}
      >
        提交
      </button>
    </>
  );
}

export default xm;
