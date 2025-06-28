import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { SchemaType } from '../types';
extendZodWithOpenApi(z);

export const ListUserSchema: SchemaType = {
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
          }),
        ),
      }),
    },
  },
};

export const DetailUserSchema: SchemaType = {
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
      }),
    },
  },
};

export const RegisterUserSchema: SchemaType = {
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
};

export const CreateUserProfileSchema: SchemaType = {
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
};

export const UpdateUserProfileSchema: SchemaType = {
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
};
