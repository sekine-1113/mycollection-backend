import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z, { string, ZodAny, ZodObject } from 'zod';
extendZodWithOpenApi(z);

export type SchemaType = {
  params: z.ZodObject<any>;
  query: z.ZodObject<any>;
  body: z.ZodObject<any>;
  responses: { [key: string]: { description: string; body: z.ZodObject<any> } };
};

export const RegisterUserSchema: SchemaType = {
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(1),
    display_name: z.string().nullable(),
  }),
  responses: {
    201: {
      description: 'Success',
      body: z.object({}),
    },
    500: {
      description: 'Server Error',
      body: z.object({
        message: z.string(),
      }),
    },
  },
};

export const LoginUserSchema: SchemaType = {
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        token: z.string(),
      }),
    },
  },
};
