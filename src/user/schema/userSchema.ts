import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { createSchema } from '../../utils';

extendZodWithOpenApi(z);

export const ListUserSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({}),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        list: z.array(
          z.object({
            user_public_id: z.string(),
            icon_url: z.string().optional(),
            display_name: z.string().optional(),
            is_public: z.boolean(),
            logins: z.array(z.date()),
          }),
        ),
      }),
    },
  },
});

export const DetailUserSchema = createSchema({
  params: z.object({
    publicId: z.string(),
  }),
  query: z.object({}),
  body: z.object({}),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        user_public_id: z.string(),
        icon_url: z.string().optional(),
        display_name: z.string().optional(),
        is_public: z.boolean(),
        logins: z.array(z.date()),
      }),
    },
  },
});

export const CreateUserProfileSchema = createSchema({
  params: z.object({
    publicId: z.string(),
  }),
  query: z.object({}),
  body: z.object({
    icon_url: z.string().optional(),
    display_name: z.string().optional(),
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

export const UpdateUserProfileSchema = createSchema({
  params: z.object({
    publicId: z.string(),
  }),
  query: z.object({}),
  body: z.object({
    icon_url: z.string().optional(),
    display_name: z.string().optional(),
    is_public: z.boolean(),
  }),
  responses: {
    200: {
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
