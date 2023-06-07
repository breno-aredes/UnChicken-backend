import { Router } from "express";

import { signIn, signUp } from "controllers/authController";

const userRouter = Router();

userRouter.post("/signup", signUp).post("/signin", signIn);

export { userRouter };
