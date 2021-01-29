import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import validateNameAndEmailOfUser from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        password: Joi.string(),
        ...validateNameAndEmailOfUser,
      },
    },
    configValidateRoute,
  ),
  usersController.create,
);

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        ...validateNameAndEmailOfUser,
      },
    },
    configValidateRoute,
  ),
  usersController.update,
);

export default usersRouter;
