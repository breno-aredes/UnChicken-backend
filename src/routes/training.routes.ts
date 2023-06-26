import { Router } from "express";

import {
  createTraining,
  getUserTrainings,
} from "controllers/trainingController";
import { authToken } from "middlewares/auth.validate";

const trainingRouter = Router();

trainingRouter
  .all("/*", authToken)
  .post("", createTraining)
  .get("", getUserTrainings);

export { trainingRouter };
