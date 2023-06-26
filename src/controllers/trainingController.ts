import { Response, NextFunction } from "express";
import httpStatus from "http-status";
import { AuthRequest } from "middlewares/auth.validate";
import trainingService from "services/trainingService";

export async function createTraining(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { name, type, description, exercises } = req.body;
  const { userId } = req.tokenData;

  try {
    await trainingService.createTraining({
      name,
      type,
      description,
      exercises,
      userId,
    });
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
