import mongoose from "mongoose";
import { MONGO_URI } from "../../config/config.service.js";
export default async function dbConnection() {
  try {
    await mongoose.connect(
     MONGO_URI,
    );

    console.log("connected ");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
