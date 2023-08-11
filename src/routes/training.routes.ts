import { Router } from "express";

import {
  createTraining,
  getTraining,
  getUserTrainings,
} from "../controllers/trainingController";
import { authToken } from "../middlewares/auth.validate";
import { schemaValidate } from "middlewares/schema.validate";
import { createTrainingSchema } from "schemas/trainingSchema";

const trainingRouter = Router();

trainingRouter
  .all("/*", authToken)
  .post("", schemaValidate(createTrainingSchema), createTraining)
  .get("", getUserTrainings)
  .get("/:trainingId", getTraining);

export { trainingRouter };
