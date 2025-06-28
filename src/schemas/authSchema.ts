import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { SchemaType } from '../types';
extendZodWithOpenApi(z);

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

export const LogoutUserSchema: SchemaType = {
  params: z.object({}),
  query: z.object({}),
  body: z.object({}),
  responses: {
    204: {
      description: 'Success',
      body: z.object({}),
    },
  },
};
