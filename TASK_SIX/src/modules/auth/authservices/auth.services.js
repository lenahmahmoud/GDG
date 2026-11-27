
import { UserModel } from "../../../DB/models/User.model.js";
import { compareHash, generateHash } from "../../../utils/hash/hash.js";
import {
  validateSignUp,
  validateLogin,
} from "../../../validation/user.validation.js";
import { generateToken } from "../../../utils/security/token.js";

export const signup = async ({
  name,
  email,
  password,
  gender,
  phone,
  DOB,
} = {}) => {
  if (!name || !email || !gender || !password || !phone || !DOB) {
    throw new Error("missing field", {
      cause: { status: 400 },
    });
  }

  const errorsSignUp = validateSignUp({
    name,
    email,
    password,
    gender,
    phone,
    DOB,
  });

  if (errorsSignUp.length) {
    throw new Error("validation error", {
      cause: {
        status: 400,
        details: errorsSignUp,
      },
    });
  }

  const existUser = await UserModel.findOne({ email, confirm: true });

  if (existUser) {
    throw new Error("user already exists", {
      cause: { status: 409 },
    });
  }

  const hashed = generateHash(password)

  const newUser = await UserModel.create({
    name,
    email,
    gender,
    phone,
    DOB,
    password: hashed,
  });

  return newUser
};

export const login = async ({ email, password } = {}) => {
  if (!email || !password) {
    throw new Error("missing field", {
      cause: { status: 400 },
    });
  }

  const errorsLogin = validateLogin({ email, password });

  if (errorsLogin.length) {
    throw new Error("validation error", {
      cause: {
        status: 400,
        details: errorsLogin,
      },
    });
  }

  const existUser = await UserModel.findOne({ email });

  if (!existUser) {
    throw new Error("invalid email or password", {
      cause: { status: 401 },
    });
  }

  const checkPassword = compareHash(password, existUser.password)

  if (!checkPassword) {
    throw new Error("invalid email or password", {
      cause: { status: 401 },
    });
  }

  const accessToken = generateToken(
    existUser._id,
    existUser.role
  );

  return accessToken
};
