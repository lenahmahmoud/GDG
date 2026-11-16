import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true, 
      minLength: [3, "the min chars is 3"],
      maxLength: [30, "the max chars is 30"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "female",
    },
  },
  { timestamps: true },
);

const usersModel =
  mongoose.models.Users || mongoose.model("Users", usersSchema);

export default usersModel;