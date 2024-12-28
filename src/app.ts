import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import auth from './app/middlewares/auth';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Blog server is running..!',
  });
});

app.get('/test', auth('admin','user'), (req: Request, res: Response) => {

  res.send({
    status: true,
    message: 'Checking for Auth',
  });
});

app.use(globalErrorHandler);

export default app;
