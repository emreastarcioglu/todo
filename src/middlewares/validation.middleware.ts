import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validationMiddleware = (
  type: any,
  value: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req[value])).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map(
            (error: ValidationError) => error.constraints
          );

          res
            .status(400)
            .json({ successful: false, message, timestamp: Date.now() });
        } else {
          next();
        }
      }
    );
  };
};
