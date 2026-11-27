import mongoose, { Schema } from "mongoose";
import { gender_enum } from "../../utils/enums/user.enum.js";
import { roles_enum } from "../../utils/enums/user.enum.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(gender_enum),
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(roles_enum),
    },
    DOB: Date,
    confirm: { type: Boolean, default: true },
    profileImg: String,
  },
  {
    timestamps: true,
    collation: "gdg",
  },
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
