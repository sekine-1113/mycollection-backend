import z from 'zod';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      decoded?: JWTBody;
    }
  }
}

interface BaseJWTBody {
  iat: number;
  exp: number;
}

export interface JWTBody extends BaseJWTBody {
  publicId: string;
}

export type SchemaType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responses: { [key: string]: { description: string; body: z.ZodObject<any> } };
};

type Method = 'get' | 'post' | 'put' | 'delete';
export type OpenAPISchemaType = {
  method: Method;
  path: string;
  security: boolean;
  schema: SchemaType;
};
