type ErrorDetails = {
  [key: string]: string;
};

type ErrorInfo = {
  statusCode: number;
  errorCode: number;
  message: string;
};

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
} as const satisfies Record<string, ErrorInfo>;

export class HTTPException extends Error {
  public readonly statusCode: number;
  public readonly errorCode: number;
  public readonly details?: ErrorDetails;

  constructor(errorType: keyof typeof ErrorTypes, details?: ErrorDetails) {
    const error = ErrorTypes[errorType];

    super(error.message);
    this.name = this.constructor.name;
    this.statusCode = error.statusCode;
    this.errorCode = error.errorCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
