export class ApplicationError extends Error {
  constructor(public message: string, public statusCode: number = 500, public code: string = 'INTERNAL_ERROR') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends ApplicationError {
  constructor() {
    super('Too many requests. Please try again later.', 429, 'RATE_LIMIT');
  }
}
