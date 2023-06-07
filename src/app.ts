import express, { Express } from "express";
import cors from "cors";

import { userRouter } from "routes/auth.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.send("OK!")).use(userRouter);

export = app;
