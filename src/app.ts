import express, { Express } from "express";
import cors from "cors";

import { userRouter } from "./routes/auth.routes";
import { connectDb, disconnectDB } from "./config/database";
import { handlingError } from "./middlewares/error-handling";
import { trainingRouter } from "./routes/training.routes";
import { reportsRouter } from "routes/reports.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", userRouter)
  .use("/training", trainingRouter)
  .use("/reports", reportsRouter)
  .use(handlingError);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
