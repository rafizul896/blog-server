import { Response } from 'express';

interface IResponce<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

const sendResponce = <T>(res: Response, data: IResponce<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default sendResponce;
