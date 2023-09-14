import { createReports } from "controllers/reportsController";
import { Router } from "express";
import { authToken } from "middlewares/auth.validate";
import { schemaValidate } from "middlewares/schema.validate";
import { reportsArraySchema } from "schemas/reportsSchemas";

const reportsRouter = Router();

reportsRouter
  .all("/*", authToken)
  .post("", schemaValidate(reportsArraySchema), createReports);

export { reportsRouter };
