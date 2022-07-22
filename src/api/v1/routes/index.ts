import { Router } from "express";
import authRouter from "./Authentication/auth";

const routes = Router();

routes.use("/v1/api/auth", authRouter);

export default routes;
