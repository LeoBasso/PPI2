import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import Validator from 'src/shared/middlewares/Validator';
import { UpdateProfileSchema } from '../schemas/UpdateProfileShema';
import UpdateProfileController from '../controllers/UpdateProfileController';
import isAuthenticated from 'src/shared/middlewares/isAuthenticated';

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateProfileController = new UpdateProfileController();

usersRouter.post('/user', Validator(CreateUserSchema), createUserController.execute);
usersRouter.put('/profile', Validator(UpdateProfileSchema),isAuthenticated, updateProfileController.update);


export default usersRouter;
