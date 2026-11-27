import { Router } from "express";
import { authentication } from "../../middlewares/auth/authentication.js";
import { profile, updateProfile } from "./profileservices/user.services.js";
const router = Router();
router.get("/profile", authentication, async (req, res, next) => {
  const user = await profile(req.user._id);
  return res.status(200).json({ message: "profile", user });
});

router.patch(
  "/update-profile/:updateField",
  authentication,
  async (req, res, next) => {
    const user = await updateProfile(
      req.user,
      req.params.updateField,
      req.body,
    );

    return res.json(201).json({ message: "updated succesfully", user });
  },
);

router.patch("/update-password", authentication, async (req, res, next) => {
  await updatePassword(req.user, req, body);
  return res.json(201).json({
    message:"password updated"
  })
});
export default router;
