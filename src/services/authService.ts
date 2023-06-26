import { users } from "@prisma/client";
import userRepository from "repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "errors";

export type CreateUserParams = Pick<users, "name" | "email" | "password">;

async function signUp({ name, email, password }: CreateUserParams) {
  const isEmailAlreadyRegistered = await userRepository.findUserByEmail(email);

  if (isEmailAlreadyRegistered)
    throw errors.conflictError(`E-mail already registered`);

  const hashedPassowrd = await bcrypt.hash(password, 10);

  return userRepository.createUser({
    name,
    email,
    password: hashedPassowrd,
  });
}

export type SignInParams = Pick<users, "email" | "password">;

type SignInResult = {
  token: string;
};

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await userRepository.findUserByEmail(email);

  if (!user) throw errors.invalidCredentilsError();

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw errors.invalidCredentilsError();

  const token = jwt.sign(
    { email: user.email, userId: user.id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "10h", noTimestamp: true }
  );

  return { token };
}

export default {
  signUp,
  signIn,
};
