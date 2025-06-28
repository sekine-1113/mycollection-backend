export const ErrorTypes = {
  BadRequest: {
    statusCode: 400,
    errorCode: 400001,
    message: 'Bad Request',
  },
  Unauthorized: {
    statusCode: 401,
    errorCode: 401001,
    message: 'Unauthorized',
  },
  Forbidden: {
    statusCode: 403,
    errorCode: 403001,
    message: 'Forbidden',
  },
  NotFound: {
    statusCode: 404,
    errorCode: 404001,
    message: 'Not Found',
  },
  InternalServerError: {
    statusCode: 500,
    errorCode: 500001,
    message: 'Internal Server Error',
  },
} as const satisfies Record<string, object>;
