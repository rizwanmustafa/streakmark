import _ from "lodash";
import joi from "joi";

import { Request, Response, NextFunction, RequestHandler } from "express";
import MarkError from "../utils/error";

interface ValidationSchema {
  body?: object;
  query?: object;
  params?: object;
}

export function validateRequest(
  validationSchema: ValidationSchema,
  validationErrorMessage?: string
): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    _.each(validationSchema, (schema, key) => {
      const joiSchema = joi.object().keys(schema);
      const value = req[key as keyof ValidationSchema];
      const { error } = joiSchema.validate(value);
      if (error) {
        const errorMessage = error.details[0].message;

        throw new MarkError(
          422,
          validationErrorMessage ??
            `${errorMessage} (${error.details[0]?.context?.value}`
        );
      }
    });
    next();
  };
}
