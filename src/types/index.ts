import type { RequestHandler } from 'express';
import type { Method, SchemaType } from './swagger';
export * from '../interfaces/storage';
export * from './swagger';

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

declare global {
  namespace Express {
    interface Request {
      user?: {
        firebaseUid: string;
        email: string;
      };
      validatedBody?: { [key: string]: unknown };
      validatedParams?: { [key: string]: unknown };
      validatedQuery?: { [key: string]: unknown };
    }
  }
}

export type RouterHandler = {
  method: Method;
  path: string;
  swaggerPath?: string;
  handlers: RequestHandler[];
  security: boolean;
  schema: SchemaType;
};
