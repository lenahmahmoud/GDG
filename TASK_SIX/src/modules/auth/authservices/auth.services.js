import { UserModel } from "../../../DB/models/User.model.js";
import bcrypt from "bcrypt";
import { validateSignUp, validateLogin } from "../../../validation/user.validation.js";
import { generateToken } from "../../../utils/security/token.js";
import "dotenv/config";

export const signup = async ({
  name,
  email,
  password,
  gender,
  phone,
  DBB,
} = {} ,res) => {
  if (!name || !email || !gender || !password || !phone || !DBB) {
    return res.status(409).json({
      message: "enter all fields",
    });
  }

  const errorsSignUp = validateSignUp(req.body);
  if (errorsSignUp.length) {
    return res.status(400).json({
      message: "validation error",
      errorsSignUp,
    });
  }

  const existUser = await UserModel.findOne({ email, confirm: true });
  if (existUser) {
    return res.status(403).json({ message: "existed" });
  }
  const hashed = bcrypt.hashSync(password, 10);
  await UserModel.create({
    ...req.body,
    password: hashed,
  });
  return 
};
export const login = async ( { email, password }={}) => {

  if (!email || !password) {
    return res.status(409).json({
      message: "enter all fields",
    });
  }

  const errorsLogin = validateLogin(req.body);
  if (errorsLogin.length) {
    return res.status(400).json({ message: "vaidation error", errorsLogin });
  }

  const existUser = await UserModel.findOne({ email });
  if (!existUser) {
    return res.status(403).json({ message: "invalid email or password" });
  }
  const checkPassword = bcrypt.compareSync(password, existUser.password);
  if (!checkPassword) {
    return res.status(403).json({ message: "invalid email or password" });
  }
  const accessToken = generateToken(existUser._id, existUser.role);
  return accessToken
};
