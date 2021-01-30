import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
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

export default usersAdminRoutes;
