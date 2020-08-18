import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import debtsRouter from '@modules/debts/infra/http/routes/debts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profilesRouter);
routes.use('/clients', clientsRouter);
routes.use('/debts', debtsRouter);

export default routes;
