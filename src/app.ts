import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Blog server is running..!',
  });
});

export default app;
