import { Router } from "express";

import { signIn, signUp } from "controllers/authController";
import { schemaValidate } from "middlewares/schema.validate";
import { signInSchema, signUpSchema } from "schemas/authSchemas";

const userRouter = Router();

userRouter
  .post("/sign-up", schemaValidate(signUpSchema), signUp)
  .post("/sign-in", schemaValidate(signInSchema), signIn);

export { userRouter };
