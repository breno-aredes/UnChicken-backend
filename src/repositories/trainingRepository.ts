import { prisma } from "../config/database";
import { Training } from "../services/trainingService";

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

type TrainingWithoutExercises = Omit<Training, "exercises">;

async function getUserTrainings(
  userId: number
): Promise<TrainingWithoutExercises[]> {
  const trainings = await prisma.training.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return trainings;
}

async function getTrainingById(trainingId: number): Promise<Training> {
  const training = await prisma.training.findUnique({
    where: {
      id: trainingId,
    },
    include: {
      exercises: true,
    },
  });
  return training;
}

export default {
  createTraining,
  getUserTrainings,
  getTrainingById,
};
