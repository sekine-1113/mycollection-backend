import { Request, Response, NextFunction, RequestHandler } from 'express';
import { SchemaType } from '../types';

export const validateRequest = (schema: SchemaType): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyResult = schema.body.safeParse(req.body);
    const paramsResult = schema.params.safeParse(req.params);
    const queriesResult = schema.query.safeParse(req.query);

    if (!bodyResult.success) {
      res.status(400).json({ errors: bodyResult.error.errors });
      return;
    }
    if (!paramsResult.success) {
      res.status(400).json({ errors: paramsResult.error.errors });
      return;
    }
    if (!queriesResult.success) {
      res.status(400).json({ errors: queriesResult.error.errors });
      return;
    }

    res.locals.validatedBody = bodyResult.data;
    res.locals.validatedParams = paramsResult.data;
    res.locals.validatedQuery = queriesResult.data;

    next();
  };
};
