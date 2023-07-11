import { Router } from "express";

import {
  createTraining,
  getTraining,
  getUserTrainings,
} from "../controllers/trainingController";
import { authToken } from "../middlewares/auth.validate";

const trainingRouter = Router();

trainingRouter
  .all("/*", authToken)
  .post("", createTraining)
  .get("", getUserTrainings)
  .get("/:trainingId", getTraining);

export { trainingRouter };
