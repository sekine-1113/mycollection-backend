export * from './storage';
export * from './swagger';

declare global {
  namespace Express {
    interface Request {
      decoded?: {
        role: string;
        firebaseUid: string;
      };
      validatedBody?: { [key: string]: unknown };
      validatedParams?: { [key: string]: unknown };
      validatedQuery?: { [key: string]: unknown };
    }
  }
}
