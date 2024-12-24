import { ErrorTypes } from './errorTypes';

type ErrorDetails = {
  [key: string]: string;
};

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
