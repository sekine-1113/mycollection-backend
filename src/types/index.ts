import type { RequestHandler } from 'express';
import type { Method, SchemaType } from './swagger';

export * from './storage';
export * from './swagger';

declare global {
  namespace Express {
    interface Request {
      decoded?: {
        role: string;
        firebaseUid: string;
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
  handlers: RequestHandler[];
  security: boolean;
  schema: SchemaType;
};
