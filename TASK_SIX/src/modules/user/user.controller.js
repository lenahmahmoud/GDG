import { Router } from "express";
import { authentication } from "../../middlewares/auth/authentication.js";
import { profile } from "./profileservices/user.services.js";
const router = Router();
router.get("/profile", authentication, async (req, res, next) => {
 const user= await profile(req.user._id);
  return res.status(200).json({ message: "profile", user });
});
export default router