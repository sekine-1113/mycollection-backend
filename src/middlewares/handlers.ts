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
      console.log({
        method,
        path: req.path,
        query: req.query,
        params: req.params,
      });
      break;
    case 'post':
    case 'put':
    case 'delete':
      console.log({
        method,
        path: req.path,
        query: req.query,
        params: req.params,
        body: req.body,
      });
      break;
    default:
      console.log({
        method,
        path: req.path,
        query: req.query,
        params: req.params,
        body: req.body,
      });
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
