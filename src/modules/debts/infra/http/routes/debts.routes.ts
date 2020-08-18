import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DebtsController from '@modules/debts/infra/http/controllers/DebtsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const debtsRouter = Router();
const debtsController = new DebtsController();

debtsRouter.use(ensureAuthenticated);

// debtsRouter.get('/', debtsController.show);
debtsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      value: Joi.number().required(),
      reason: Joi.string().required(),
      date: Joi.string().required(),
      client: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
      }),
    },
  }),
  debtsController.store,
);
debtsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      value: Joi.number().required(),
      reason: Joi.string().required(),
      date: Joi.string().required(),
      client: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
      }),
    },
  }),
  debtsController.update,
);

export default debtsRouter;
