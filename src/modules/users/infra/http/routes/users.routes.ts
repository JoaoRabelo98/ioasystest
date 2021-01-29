import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string(),
      },
    },
    { abortEarly: false },
  ),
  usersController.create,
);

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
      },
    },
    { abortEarly: false },
  ),
  usersController.update,
);

export default usersRouter;
