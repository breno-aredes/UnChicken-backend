import { users } from "@prisma/client";
import userRepository from "repositories/userRepository";
import bcrypt from "bcrypt";

type CreateUserParams = Pick<users, "email" | "password" | "name">;

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

export default {
  signUp,
};
