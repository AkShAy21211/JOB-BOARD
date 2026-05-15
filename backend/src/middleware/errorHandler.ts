import type { ErrorRequestHandler } from 'express';

interface HttpError extends Error {
  statusCode?: number;
}

const errorHandler: ErrorRequestHandler = (err: HttpError, _req, res, _next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
