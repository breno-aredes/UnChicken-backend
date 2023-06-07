import { ObjectSchema, ValidationErrorItem } from "joi";
import { Request, Response, NextFunction } from "express";

export function schemaValidate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errMessages = error.details.map(
        (err: ValidationErrorItem) => err.message
      );
      return res.status(422).send(errMessages);
    }
    next();
  };
}
