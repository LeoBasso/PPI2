import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandler';
import { NotFound } from './middlewares/NotFound';
import './typeorm/dataSource';
import './container/index';
import usersRouter from 'src/modules/user/http/routes/User.routes';
import schedulesRouter from 'src/modules/schedules/http/routes/Schedule.routes';
import loginRouter from 'src/modules/auth/http/routes/Login.routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loginRouter);
app.use(usersRouter);
app.use(schedulesRouter);

app.use(ErrorHandlerMiddleware);
app.use(NotFound);

export default app;
