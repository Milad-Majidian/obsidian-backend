export class ApiError extends Error {
  public statusCode: number;
  public message: string;
  public stack?: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    // Only capture stack trace in development
    if (process.env.NODE_ENV !== 'production') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
