import { Request, Response, Router } from "express";
import AuthController from "../../controllers/AuthController";

let authRouter = Router();

authRouter.post("/login", AuthController.login);

authRouter.post("/register", AuthController.register);

authRouter.post("/logout", AuthController.logout);

export default authRouter;
