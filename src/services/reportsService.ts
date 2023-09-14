import reportsRepository from "repositories/reportsRepository";
import errors from "../errors";
import userRepository from "repositories/userRepository";
import trainingRepository from "repositories/trainingRepository";

export type Reports = {
  userId: number;
  trainingId: number;
  exercises: {
    exerciseId: number;
    averageReps: number;
  }[];
};

async function createReports({ userId, exercises, trainingId }: Reports) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw errors.invalidCredentilsError();

  const training = await trainingRepository.getTrainingById(trainingId);

  if (training.exercises.length != exercises.length) {
    throw errors.validationError(
      "The number of exercises is different than expected."
    );
  }

  const newArrayIds = exercises.map((e) => e.exerciseId);

  for (let i = 0; i < newArrayIds.length; i++) {
    if (!newArrayIds.includes(training.exercises[i].id)) {
      throw errors.validationError(
        "The exercises provided do not match the expected exercises."
      );
    }
  }

  await reportsRepository.createReports({ userId, exercises });

  return;
}

export default {
  createReports,
};
