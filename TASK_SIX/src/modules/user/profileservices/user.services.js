import { UserModel } from "../../../DB/models/User.model.js";

export const profile = async (id ,res) => {
  if (!id) {
    return res.status(404).json({ message: "invalid id " });
  }
  const user = await UserModel.findById(id, {
    password: 0,
    role: 0,
    confirm: 0,
  });
  if (!user) {
    return res.status(404).json({ message: "not found" });
  }
  return user
};
