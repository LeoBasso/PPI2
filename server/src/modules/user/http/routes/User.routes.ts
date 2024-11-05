import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import Validator from 'src/shared/middlewares/Validator';
import { UpdateProfileSchema } from '../schemas/UpdateProfileShema';
import UpdateProfileController from '../controllers/UpdateProfileController';
import isAuthenticated from 'src/shared/middlewares/isAuthenticated';
import { ListUsersController } from '../controllers/ListUsersController';
import { UpdateUserSchema } from '../schemas/UpdateUserShema';
import UpdateUserController from '../controllers/UpdateUserController';

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateProfileController = new UpdateProfileController();
const listUsersController = new ListUsersController();
const updateUsersController = new UpdateUserController();

usersRouter.post('/user', Validator(CreateUserSchema), createUserController.execute);
usersRouter.put('/profile', Validator(UpdateProfileSchema),isAuthenticated, updateProfileController.update);
usersRouter.put('/user/:id', Validator(UpdateUserSchema),isAuthenticated, updateUsersController.update);
usersRouter.get('/users', listUsersController.execute);

export default usersRouter;
