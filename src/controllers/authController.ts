import { Request, Response } from "express";
import httpStatus from "http-status";
import authService from "services/authService";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await authService.signUp({ name, email, password });
    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    console.log(error);
  }
}

export async function signIn() {}
