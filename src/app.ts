import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { blogRoutes } from './app/modules/blog/blog.route';
import { adminRoutes } from './app/modules/admin/admin.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Blog server is running..!',
  });
});

app.use(globalErrorHandler);

export default app;
