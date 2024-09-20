import { Router } from 'express';
import { LoginSchema } from '../schemas/LoginSchema';
import Validator from 'src/shared/middlewares/Validator';
import { LoginController } from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/auth', Validator(LoginSchema), loginController.execute);

export default loginRouter;
