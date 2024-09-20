import { Router } from 'express';
import Validator from 'src/shared/middlewares/Validator';
import { CreateScheduleController } from '../controllers/CreateScheduleController';
import { UpdateScheduleController } from '../controllers/UpdateScheduleController';
import { DeleteScheduleController } from '../controllers/DeleteScheduleController';
import { ListSchedulesController } from '../controllers/ListSchedulesController';

import { CreateScheduleSchema } from '../schemas/CreateScheduleSchema';
import { UpdateScheduleSchema } from '../schemas/UpdateScheduleSchema';

import isAuthenticated from 'src/shared/middlewares/isAuthenticated';
import { DeleteScheduleSchema } from '../schemas/DeleteScheduleSchema';

const schedulesRouter = Router();
const createScheduleController = new CreateScheduleController();
const updateScheduleController = new UpdateScheduleController();
const deleteScheduleController = new DeleteScheduleController();
const listSchedulesController = new ListSchedulesController();

schedulesRouter.use(isAuthenticated);

schedulesRouter.post('/schedule', Validator(CreateScheduleSchema), createScheduleController.execute);
schedulesRouter.put('/schedule/:id', Validator(UpdateScheduleSchema), updateScheduleController.execute);
schedulesRouter.delete('/schedule/:id', Validator(DeleteScheduleSchema), deleteScheduleController.execute);
schedulesRouter.get('/schedules', listSchedulesController.execute);

export default schedulesRouter;
