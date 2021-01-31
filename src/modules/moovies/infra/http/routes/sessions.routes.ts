import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import ensureAdmin from '@modules/users/infra/http/middlewares/ensureAdmin';
import MooviesController from '../controllers/MooviesController';

const mooviesRoutes = Router();
const mooviesController = new MooviesController();

mooviesRoutes.post(
  '/',
  ensureAdmin,
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
