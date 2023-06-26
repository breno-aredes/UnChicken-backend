import { Router } from "express";

import { createTraining } from "controllers/trainingController";
import { authToken } from "middlewares/auth.validate";

const trainingRouter = Router();

trainingRouter.all("/*", authToken).post("", createTraining);

export { trainingRouter };
