import { z } from 'zod';
import { Method } from './types';

export function createSchema<
  P extends z.ZodTypeAny,
  Q extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
  R extends Record<number, { description: string; body: z.ZodTypeAny }>,
>(def: { params: P; query: Q; body: B; responses: R }) {
  return def;
}

export function createEndpoint<
  P extends z.ZodTypeAny,
  Q extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
  R extends Record<number, { description: string; body: z.ZodTypeAny }>,
>(def: {
  method: Method;
  path: string;
  security: boolean;
  tags: string[];
  schema: {
    params: P;
    query: Q;
    body: B;
    responses: R;
  };
}) {
  return def;
}
