import { Router } from 'express';

import ClientsController from '@modules/clients/infra/http/controllers/ClientsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', clientsController.index);

export default clientsRouter;
