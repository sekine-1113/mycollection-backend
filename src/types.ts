import { UserPermission } from '@prisma/client';
import z from 'zod';

declare global {
  namespace Express {
    interface Request {
      decoded?: JWTBody;
      validatedBody?: { [key: string]: unknown };
      validatedParams?: { [key: string]: unknown };
      validatedQuery?: { [key: string]: unknown };
    }
  }
}

interface BaseJWTBody {
  iat: number;
  exp: number;
}

export interface JWTBody extends BaseJWTBody {
  publicId: string;
  permission: UserPermission;
}

export type SchemaType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responses: Record<number, { description: string; body: z.ZodObject<any> }>;
};

export type Method = 'get' | 'post' | 'put' | 'delete';
export type OpenAPISchemaType = {
  method: Method;
  path: string;
  security: boolean;
  schema: SchemaType;
};
