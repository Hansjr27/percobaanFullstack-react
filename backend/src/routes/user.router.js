import { Router } from "express";
import { createUser, getAcessToken } from "../controllers/user.controller.js";
import { generateRefreshToken } from "../utils/jwt.js"; // Ensure the extension .js is included

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users/:id", getAcessToken);
userRouter.get("/refresh", generateRefreshToken);

export default userRouter;
