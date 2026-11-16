import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/exp")
    .then((result) => {
      console.log("mongodb is connected");
    })
    .catch((err) => console.log(err));
};

export default dbConnection;
