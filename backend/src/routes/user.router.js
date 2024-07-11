import { Router } from "express";
import { createUser, getAcessToken } from "../controllers/user.controller";
import { generateRefreshToken } from "../utils/jwt";

const userRouter = Router();

userRouter.post("/user", createUser);
userRouter.get("/user/:id", getAcessToken);
userRouter.get("/refrest", generateRefreshToken);
