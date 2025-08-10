import { z } from 'zod';
import { Method, SchemaType } from './types';
import { RequestHandler } from 'express';

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

export const generateEndpoints = (
  pathPrefix: string,
  tags: string[],
  info: {
    method: Method;
    path: string;
    security: boolean;
    schema: SchemaType;
  }[],
) => {
  return info.map((it) =>
    createEndpoint({
      method: it.method,
      path: `${pathPrefix}${it.path}`,
      security: it.security,
      tags: tags,
      schema: it.schema,
    }),
  );
};

export const generateSchema = (
  pathPrefix: string,
  tags: string[],
  routerHandlers: {
    method: Method;
    path: string;
    handlers: RequestHandler[];
    security: boolean;
    schema: SchemaType;
  }[],
) => {
  return [
    ...generateEndpoints(
      pathPrefix,
      tags,
      routerHandlers.map((it) => ({
        method: it.method,
        path: it.path,
        security: it.security,
        schema: it.schema,
      })),
    ),
  ];
};
