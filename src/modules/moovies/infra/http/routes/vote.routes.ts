import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import ensureUser from '@modules/users/infra/http/middlewares/ensureUser';
import VoteMoovieController from '../controllers/VoteMoovieController';

const voteMoovieRouter = Router();
const voteMoovieController = new VoteMoovieController();

voteMoovieRouter.post(
  '/',
  ensureUser,
  celebrate(
    {
      [Segments.BODY]: {
        moovieId: Joi.string().uuid(),
        rate: Joi.number().integer().min(1).max(4),
      },
    },
    configValidateRoute,
  ),
  voteMoovieController.create,
);

export default voteMoovieRouter;
