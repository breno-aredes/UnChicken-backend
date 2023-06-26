import errors from "errors";
import trainingRepository from "repositories/trainingRepository";
import userRepository from "repositories/userRepository";

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
};
