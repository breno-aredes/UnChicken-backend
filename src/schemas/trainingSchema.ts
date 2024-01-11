import Joi from "joi";
import { Training } from "services/trainingService";

const exerciseSchema = Joi.object({
  name: Joi.string().required(),
  repetitions: Joi.number().integer().positive().strict().required(),
  series: Joi.number().integer().positive().strict().required(),
});

export const createTrainingSchema = Joi.object<Training>({
  name: Joi.string().required(),
  type: Joi.string().valid("circuit", "series").required(),
  description: Joi.string().allow(""),
  exercises: Joi.array().items(exerciseSchema).min(1).required(),
});
