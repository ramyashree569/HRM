import { Request, Response, Router } from "express";
import { register, login, logout, displayData} from '../../controllers/AuthController';

let authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", logout);

authRouter.post("/profile", displayData)

export default authRouter;
