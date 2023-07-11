import errors from "../errors";
import trainingRepository from "../repositories/trainingRepository";
import userRepository from "../repositories/userRepository";

export type Training = {
  name: string;
  type: string;
  description: string;
  exercises: {
    name: string;
    repetitions: number;
    series: number;
  }[];
  userId: number;
};

async function getUserTrainings(userId: number) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw errors.invalidCredentilsError();

  const trainings = await trainingRepository.getUserTrainings(userId);

  if (!trainings) throw errors.notFoundError();

  return trainings;
}

async function getTraining(userId: number, trainingId: number) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw errors.invalidCredentilsError();

  const training = await trainingRepository.getTrainingById(trainingId);

  if (!training) throw errors.notFoundError();

  if (training.userId !== userId) throw errors.forBiddenError();

  return training;
}

async function createTraining({
  name,
  type,
  description,
  exercises,
  userId,
}: Training) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw errors.invalidCredentilsError();

  const training = await trainingRepository.createTraining({
    name,
    type,
    description,
    exercises,
    userId,
  });

  return training;
}

export default {
  createTraining,
  getUserTrainings,
  getTraining,
};
