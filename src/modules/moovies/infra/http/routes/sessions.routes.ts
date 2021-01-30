import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import MooviesController from '../controllers/MooviesController';

const mooviesRoutes = Router();
const mooviesController = new MooviesController();

mooviesRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        actors: Joi.array().items(Joi.string().uuid()).required(),
        director: Joi.string().required(),
        genre: Joi.string().required(),
        name: Joi.string().required(),
      },
    },
    configValidateRoute,
  ),
  mooviesController.create,
);

export default mooviesRoutes;
