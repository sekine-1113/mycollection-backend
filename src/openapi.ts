import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
  ResponseConfig,
} from '@asteasolutions/zod-to-openapi';
import { openAPISchemas } from './openapi-schema';

const registry = new OpenAPIRegistry();
openAPISchemas.forEach(({ method, path, schema }) => {
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
    operationId: `${method}_${path.replace(/\//g, '_')}`,
    summary: `Operation for ${method} ${path}`,
    request: {
      params: schema.params,
      body: {
        content: {
          'application/json': {
            schema: schema.body,
          },
        },
      },
    },
    responses: responses,
  });
});

const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  info: {
    title: 'TITLE',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
    },
  ],
});
