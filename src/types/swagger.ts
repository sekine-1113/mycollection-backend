/* eslint-disable @typescript-eslint/no-explicit-any */
import type z from 'zod';

export type SchemaType = {
  params: z.ZodObject<any>;
  query: z.ZodObject<any>;
  body: z.ZodObject<any>;
  responses: Record<number, { description: string; body: z.ZodObject<any> }>;
};

export type Method = 'get' | 'post' | 'put' | 'delete';
export type OpenAPISchemaType = {
  method: Method;
  path: string;
  security: boolean;
  schema: SchemaType;
};
