import { Response, NextFunction } from "express";
import httpStatus from "http-status";
import { AuthRequest } from "../middlewares/auth.validate";
import trainingService from "../services/trainingService";

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

export async function getUserTrainings(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.tokenData;

  try {
    const trainings = await trainingService.getUserTrainings(userId);
    res.status(httpStatus.OK).send(trainings);
  } catch (error) {
    next(error);
  }
}

export async function getTraining(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { trainingId } = req.params;
  const { userId } = req.tokenData;

  try {
    const training = await trainingService.getTraining(
      userId,
      parseInt(trainingId as string)
    );
    res.status(httpStatus.OK).send(training);
  } catch (error) {
    next(error);
  }
}

export async function getTrainingReports(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { trainingId } = req.params;
  const { userId } = req.tokenData;

  try {
    const training = await trainingService.getTrainingReports(
      parseInt(trainingId as string),
      userId
    );
    res.status(httpStatus.OK).send(training);
  } catch (error) {
    next(error);
  }
}

export async function deleteTraining(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { trainingId } = req.params;
  const { userId } = req.tokenData;

  try {
    await trainingService.deleteTraining(
      parseInt(trainingId as string),
      userId
    );

    res.status(httpStatus.OK).send(`deleted`);
  } catch (error) {
    next(error);
  }
}
