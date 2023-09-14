import Joi from "joi";

type Reports = {
  exerciseId: number;
  averageReps: number;
};

export const reportsArraySchema = Joi.object({
  trainingId: Joi.number().positive().required(),
  exercises: Joi.array()
    .items(
      Joi.object<Reports>({
        exerciseId: Joi.number().integer().positive().strict().required(),
        averageReps: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
});
