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
          //       user_public_id: string;
          // profile: {
          //     icon_url: string | null | undefined;
          //     display_name: string | null | undefined;
          //     is_public: boolean | undefined;
          // };
          z.object({
            user_public_id: z.string(),
            profile: z.object({
              icon_url: z.string().nullish(),
              display_name: z.string().nullish(),
              is_public: z.boolean().optional(),
            }),
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
        profile: z.object({
          icon_url: z.string().optional(),
          display_name: z.string().optional(),
          is_public: z.boolean(),
        }),
      }),
    },
  },
});

export const CreateUserProfileSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    icon_url: z.string().optional(),
    display_name: z.string().optional(),
    is_public: z.boolean().optional().default(true),
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
