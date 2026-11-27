import dbConnection from "./DB/DBconnection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";

export default async function bootsrap(app, express) {
  app.use(express.json());
  await dbConnection();

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use("{/*any}", (req, res) => {
    return res.status(404).json({ message: "invalid routing" });
  });

  app.use((error, req, res, next) => {
    const msg = error.message || "server error";
    const status = error.cause?.status || 500;
    const details = error.cause?.details || undefined;
    return res.status(status).json({
      msg,
      details,
    });
  });
}
