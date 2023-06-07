import { Request, Response } from "express";
import httpStatus from "http-status";
import authService from "services/authService";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await authService.signUp({ name, email, password });
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await authService.signIn({ email, password });
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
  }
}
