import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.validate";
import reportsService from "services/reportsService";
import httpStatus from "http-status";

export async function createReports(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { exercises, trainingId } = req.body;
  const { userId } = req.tokenData;

  try {
    await reportsService.createReports({
      userId,
      exercises,
      trainingId,
    });
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
