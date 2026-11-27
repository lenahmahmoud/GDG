import express from "express";
import bootsrap from "./src/app.controller.js";
import { PORT } from "./config/config.service.js";
const app = express();

bootsrap(app, express);

app.listen(PORT, () => {
  console.log("Server is running");
});