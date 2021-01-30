import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import validateNameAndEmailOfUser from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersAdminController from '../controllers/UsersAdminController';

const usersAdminRoutes = Router();
const usersAdminController = new UsersAdminController();

usersAdminRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        password: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    },
    configValidateRoute,
  ),
  usersAdminController.create,
);

usersAdminRoutes.put(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        ...validateNameAndEmailOfUser,
      },
    },
    configValidateRoute,
  ),
  usersAdminController.update,
);

usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    configValidateRoute,
  ),
  usersController.inactivate,
);

export default usersAdminRoutes;
