import { gender_enum } from "../utils/enums/user.enum.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org)$/i;
const phoneRegex = /^01[0125][0-9]{8}$/;

export function validateSignUp(name, email, password, gender, phone, DBB) {
  const errors = [];
  if (name.length < 8) {
    errors.push({ message: "must be at least 8 chars" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ message: "invalid email typo" });
  }
  if (password.length < 8) {
    errors.push({ message: "password must be at least 8 " });
  }
  if (!Object.values(gender_enum).includes(gender)) {
    errors.push({ message: "invalid gender" });
  }
  if (!phoneRegex.test(phone)) {
    errors.push({ message: "invalid phone" });
  }
  if (new Date(DBB) > new Date()) {
    errors.push("can't be in te future");
  }
  return errors;
}

export function validateLogin(email) {
  const errors = [];
  if (!emailRegex.test(email)) {
    errors.push("invalid email typo");
  }
  return errors;
}
