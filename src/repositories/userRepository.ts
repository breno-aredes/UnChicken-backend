import { prisma } from "@config/database";
import { Prisma, users } from "@prisma/client";

async function findUserByEmail(email: string): Promise<users | null> {
  return (
    prisma.users.findFirst({
      where: {
        email,
      },
    }) || null
  );
}

async function createUser(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data,
  });
}

export default {
  findUserByEmail,
  createUser,
};
