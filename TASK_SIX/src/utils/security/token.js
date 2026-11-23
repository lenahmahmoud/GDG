import jwt from "jsonwebtoken";

export const generateToken = (_id, role) => {
  if (!_id || !role) {
    return res.status(404).json({ message: "misssing fields" });
  }
  return jwt.sign({ _id, role }, process.env.JWT_SECRET);
};

export const verifyToken = (token) => {
  if (!token) {
    return res.status(404).json({ message: "misssing token" });
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    return res.status(403).json({ message: "unauthorized" });
  }
  return payload
};
