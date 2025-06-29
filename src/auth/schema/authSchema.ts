import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { createSchema } from '../../utils';

extendZodWithOpenApi(z);

export const SignUpUserSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(1),
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
});

export const SignInUserSchema = createSchema({
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
});

export const SignOutUserSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({}),
  responses: {
    204: {
      description: 'Success',
      body: z.object({}),
    },
  },
});
