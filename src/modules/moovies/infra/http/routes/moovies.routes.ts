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

mooviesRoutes.get(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    configValidateRoute,
  ),
  mooviesController.findOne,
);

mooviesRoutes.get(
  '/',
  celebrate(
    {
      [Segments.QUERY]: {
        name: Joi.string().optional(),
        director: Joi.string().optional(),
        genre: Joi.string().optional(),
      },
    },
    configValidateRoute,
  ),
  mooviesController.findAll,
);

export default mooviesRoutes;
