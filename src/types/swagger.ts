import type z from 'zod';

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
