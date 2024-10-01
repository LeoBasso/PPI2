import { Router } from 'express';
import Validator from 'src/shared/middlewares/Validator';
import { CreateServiceController } from '../controllers/CreateServiceController';
import { UpdateServiceController } from '../controllers/UpdateServiceController';
import { DeleteServiceController } from '../controllers/DeleteServiceController';
import { ListServicesController } from '../controllers/ListServicesController';

import { CreateServiceSchema } from '../schemas/CreateServiceSchema';
import { UpdateServiceSchema } from '../schemas/UpdateServiceSchema';

import isAuthenticated from 'src/shared/middlewares/isAuthenticated';
import { DeleteServiceSchema } from '../schemas/DeleteServiceSchema';

const servicesRouter = Router();
const createServiceController = new CreateServiceController();
const updateServiceController = new UpdateServiceController();
const deleteServiceController = new DeleteServiceController();
const listServicesController = new ListServicesController();

servicesRouter.use(isAuthenticated);

servicesRouter.post('/service', Validator(CreateServiceSchema), createServiceController.execute);
servicesRouter.put('/service/:id', Validator(UpdateServiceSchema), updateServiceController.execute);
servicesRouter.delete('/service/:id', Validator(DeleteServiceSchema), deleteServiceController.execute);
servicesRouter.get('/services', listServicesController.execute);

export default servicesRouter;
