import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import TodoRouter from './routes/todo.routes';
import CategoryRouter from './routes/category.routes';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.APP_PORT;

const main = async () => {
  try {
    await AppDataSource.initialize();
    const app = express();

    app.use(bodyParser.json());

    app.use('/api/todos', TodoRouter);

    app.use('/api/categories', CategoryRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      res.status(500).send(err);
    });

    app.listen(port, () => {
      console.log(`Application is running on http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

main();
