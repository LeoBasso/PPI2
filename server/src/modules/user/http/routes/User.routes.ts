import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import Validator from 'src/shared/middlewares/Validator';
import { UpdateProfileSchema } from '../schemas/UpdateProfileShema';
import UpdateProfileController from '../controllers/UpdateProfileController';
import isAuthenticated from 'src/shared/middlewares/isAuthenticated';
import { ListUsersController } from '../controllers/ListUsersController';

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateProfileController = new UpdateProfileController();
const listUsersController = new ListUsersController();

usersRouter.post('/user', Validator(CreateUserSchema), createUserController.execute);
usersRouter.put('/profile', Validator(UpdateProfileSchema),isAuthenticated, updateProfileController.update);
usersRouter.get('/users', listUsersController.execute);


export default usersRouter;
