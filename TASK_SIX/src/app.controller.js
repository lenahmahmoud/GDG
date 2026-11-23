import dbConnection from "./DB/DBconnection.js";
import authRouter from './modules/auth/auth.controller.js'
import userRouter from './modules/user/user.controller.js'
export default async function bootsrap(app, express) {
  app.use(express.json());
  await dbConnection();

  app.use(authRouter)
  app.use(userRouter)


 
}
