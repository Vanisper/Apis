import express from "express";
import { host, port, version } from "./config/app.json";
import { apis } from "./config/index.json";
import { xm } from "./routers/xm";

const app = express();
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

apis.forEach((item, index, items) => {
  app.get(`/v${version}/${item.api}`, async (req, res) => {
    if (item.api == "xm") {
      res.send(await xm(items, index, req));
    }
  });
});

app.listen(port, host, () => {
  console.log("服务运行于：", "http://" + host + ":" + port);
});
