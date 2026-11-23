import { verifyToken } from "../../utils/security/token.js";
import { UserModel } from "../../DB/models/User.model.js";
export const authentication = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    return res.status(401).json({ message: "token not exist" });
  }
  const payload = verifyToken(token);
  const existUser = await UserModel.findById(payload._id, {
    name: 1,
   
  });
  if (!existUser.name) {
    return res.status(404).json({ message: "not found" });
  }
  req.user = existUser;
  next();
};
