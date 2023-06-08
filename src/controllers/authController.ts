import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import authService from "services/authService";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  try {
    await authService.signUp({ name, email, password });
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const result = await authService.signIn({ email, password });
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}
