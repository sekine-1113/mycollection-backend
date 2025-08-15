import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
  ResponseConfig,
} from '@asteasolutions/zod-to-openapi';
import { openAPISchemas } from './openapi-schema';
import config from '../config';

const registry = new OpenAPIRegistry();
registry.registerComponent('securitySchemes', 'BearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

openAPISchemas.forEach(({ method, path, security, tags, schema }) => {
  const responses: {
    [statusCode: string]: ResponseConfig;
  } = {};
  for (const [statusCode, response] of Object.entries(schema.responses)) {
    responses[statusCode] = {
      description: response.description,
      content: {
        'application/json': {
          schema: response.body,
        },
      },
    };
  }
  registry.registerPath({
    method,
    path,
    operationId: `${method.toUpperCase()}_${path.replace(/\//g, '_')}`,
    summary: `Operation for ${method} ${path}`,
    request: {
      params: schema.params,
      body:
        method === 'get'
          ? undefined
          : {
              content: {
                'application/json': {
                  schema: schema.body,
                },
              },
            },
    },
    responses: responses,
    security: security ? [{ BearerAuth: [] }] : [],
    tags,
  });
});

const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  info: {
    title: 'test',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  servers: [
    {
      url: `${config.DOMAIN}:${config.PORT}/api/v1`,
    },
  ],
});
