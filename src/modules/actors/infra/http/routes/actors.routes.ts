import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import ActorsController from '../controllers/ActorsController';

const actorsRoute = Router();
const actorsController = new ActorsController();

actorsRoute.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
      },
    },
    configValidateRoute,
  ),
  actorsController.create,
);

export default actorsRoute;
