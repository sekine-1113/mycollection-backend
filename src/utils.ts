import { z } from 'zod';
import { Expand, Method, RouterHandler } from './types';

export const createSchema = <
  P extends z.ZodTypeAny,
  Q extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
  R extends Record<number, { description: string; body: z.ZodTypeAny }>,
>(def: {
  params: P;
  query: Q;
  body: B;
  responses: R;
}) => {
  return def;
};

export const createEndpoint = <
  P extends z.ZodTypeAny,
  Q extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
  R extends Record<number, { description: string; body: z.ZodTypeAny }>,
>(def: {
  method: Method;
  path: string;
  swaggerPath?: string;
  security: boolean;
  tags: string[];
  schema: {
    params: P;
    query: Q;
    body: B;
    responses: R;
  };
}) => {
  return def;
};

export const generateEndpoints = (
  pathPrefix: string,
  tags: string[],
  info: Expand<Omit<RouterHandler, 'handlers'>>[],
) => {
  return info.map((it) =>
    createEndpoint({
      method: it.method,
      path: it.swaggerPath
        ? `${pathPrefix}${it.swaggerPath}`
        : `${pathPrefix}${it.path}`,
      security: it.security,
      tags: tags,
      schema: it.schema,
    }),
  );
};

export const generateSchema = (
  pathPrefix: string,
  tags: string[],
  routerHandlers: RouterHandler[],
) => {
  return [
    ...generateEndpoints(
      pathPrefix,
      tags,
      routerHandlers.map((it) => ({
        method: it.method,
        path: it.path,
        swaggerPath: it.swaggerPath,
        security: it.security,
        schema: it.schema,
      })),
    ),
  ];
};
