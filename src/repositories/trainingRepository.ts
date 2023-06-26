import { prisma } from "@config/database";
import { Training } from "services/trainingService";

async function createTraining({
  name,
  type,
  description,
  exercises,
  userId,
}: Training) {
  return await prisma.training.create({
    data: {
      name,
      type,
      description,
      userId,
      exercises: {
        create: exercises.map((exercise) => ({
          name: exercise.name,
          repetitions: exercise.repetitions,
          series: exercise.series,
        })),
      },
    },
  });
}

export default {
  createTraining,
};
