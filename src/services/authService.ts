import { users } from "@prisma/client";
import userRepository from "repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type CreateUserParams = Pick<users, "name" | "email" | "password">;

async function signUp({ name, email, password }: CreateUserParams) {
  const isEmailAlreadyRegistered = await userRepository.findUserByEmail(email);

  if (isEmailAlreadyRegistered) return "ja ta cadastrado maluco";

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

// | string é temporario até criar os erros.
async function signIn(params: SignInParams): Promise<SignInResult | string> {
  const { email, password } = params;

  const user = await userRepository.findUserByEmail(email);

  if (!user) return "not found maluko";

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return "senha errada doidão";

  const token = jwt.sign(
    { email: user.email, userId: user.id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "10h", noTimestamp: true }
  );

  return token;
}

export default {
  signUp,
  signIn,
};
