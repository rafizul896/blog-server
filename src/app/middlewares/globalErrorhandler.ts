import { ErrorRequestHandler } from 'express';
import config from '../config';

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Something went wrong!';

  const error: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  // ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    // err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });

  next();
};

export default globalErrorHandler;
