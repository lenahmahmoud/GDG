import { config } from "dotenv";
import { resolve } from "node:path";
if (process.env.ENV_MODE !== "production") {
  config({ path: resolve("./config/.env") });
}
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
