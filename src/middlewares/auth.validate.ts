import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  email: string;
  userId: number;
  name: string;
  exp: number;
};

export interface AuthRequest extends Request {
  tokenData: JwtPayload;
}

async function authToken(req: AuthRequest, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  if (!token) return "não podi! não tem token";

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    if (verifyToken.exp < currentTime) return "esse token ta vencidão irmão";

    req.tokenData = verifyToken;

    next();
  } catch (error) {
    console.log(error);
  }
}

export { authToken };
