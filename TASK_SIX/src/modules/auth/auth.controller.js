import { Router } from "express";
import { signup ,login } from "./authservices/auth.services.js";

const router = Router();
router.post("/signup", async (req, res) => {
  await signup(req.body);
  res.status(201).json({ message: "created" });
});

router.post("/login", async (req, res) => {
 const accessToken= await login(req.body);
  res.status(200).json({ message: "logged in ", accessToken });
});

export default router;
