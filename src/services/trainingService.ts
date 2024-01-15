import errors from "../errors";
import trainingRepository from "../repositories/trainingRepository";
import userRepository from "../repositories/userRepository";

export type Training = {
  name: string;
  type: string;
  description: string;
  exercises: {
    id?: number;
    name: string;
    repetitions: number;
    series: number;
    resumes?: {
      id: number;
      userId: number;
      exerciseId: number;
      averageReps: number;
      createdAt: Date;
    }[];
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

async function getTrainingReports(trainingId: number, userId: number) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw errors.invalidCredentilsError();

  const training = await trainingRepository.getTrainingReports(trainingId);

  if (!training) throw errors.notFoundError();

  return training;
}

async function deleteTraining(trainingId: number, userId: number) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw errors.invalidCredentilsError();

  await trainingRepository.deleteTraining(trainingId);

  return;
}

export default {
  createTraining,
  getUserTrainings,
  getTraining,
  getTrainingReports,
  deleteTraining,
};
