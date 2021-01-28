import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
    },
  }),
  usersController.create,
);

export default usersRouter;
