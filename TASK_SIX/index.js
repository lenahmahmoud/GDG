import express from "express";
import bootsrap from "./src/app.controller.js";
const app = express();
bootsrap(app,express)
app.listen(5000, () => {
  console.log("server is runing ");
});
