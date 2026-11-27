import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config.service.js";

export const generateToken = (_id, role) => {
  if (!_id || !role) {
    return res.status(404).json({ message: "misssing fields" });
  }
  return jwt.sign({ _id, role }, JWT_SECRET);
};

export const verifyToken = (token) => {
  if (!token) {
    return res.status(404).json({ message: "misssing token" });
  }
  const payload = jwt.verify(token,JWT_SECRET);

  if (!payload) {
    return res.status(403).json({ message: "unauthorized" });
  }
  return payload
};
