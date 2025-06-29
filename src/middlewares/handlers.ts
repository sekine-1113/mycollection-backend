import { HTTPException } from '../error';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const defineHandler =
  (
    handler: (
      req: Request,
      res: Response,
      next?: NextFunction,
    ) => Promise<unknown>,
  ): RequestHandler =>
  (req, res, next) => {
    handler(req, res, next).catch(next);
  };

export const debugHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const method = req.method;
  switch (method.toLowerCase()) {
    case 'get':
      console.log(req.path, req.query, req.params);
      break;
    case 'post':
      console.log(req.path, req.query, req.params, req.body);
      break;
    case 'put':
      console.log(req.path, req.query, req.params, req.body);
      break;
    case 'delete':
      console.log(req.path, req.query, req.params, req.body);
      break;
    default:
      console.log(method, req.path, req.query, req.params, req.body);
      break;
  }
  next();
};

export const errorHandler = (
  err: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .status(err.statusCode ?? 500)
    .json({ message: err.message, details: err.details });
};
