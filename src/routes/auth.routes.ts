import { Router } from "express";

import { signIn, signUp } from "controllers/authController";
import { schemaValidate } from "middlewares/schema.validate";
import { signUpSchema } from "schemas/authSchemas";

const userRouter = Router();

userRouter
  .post("/signup", schemaValidate(signUpSchema), signUp)
  .post("/signin", schemaValidate(signUpSchema), signIn);

export { userRouter };
