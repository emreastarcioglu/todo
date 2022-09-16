import { Response } from 'express';

export class EntityNotFound extends Error {
  readonly statusCode = 404;

  /**
   * Response object of http request
   */
  res: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.name = 'EntityNotFound';
    this.res = res;
  }

  public getResponse() {
    return this.res.status(this.statusCode).json({
      success: false,
      errorName: this.name,
      description: this.message,
      timestamp: Date.now(),
    });
  }
}
