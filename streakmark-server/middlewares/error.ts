import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  // Log error
  console.error(err);

  // Send error response
  res.status(500).json({
    error: err.message,
  });
}

export default errorHandler;
