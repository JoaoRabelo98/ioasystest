import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersAdminRoutes from '@modules/users/infra/http/routes/usersAdmin.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/users/infra/http/middlewares/ensureAdmin';
import actorsRoute from '@modules/actors/infra/http/routes/actors.routes';
import mooviesRoutes from '@modules/moovies/infra/http/routes/sessions.routes';
import voteMoovieRouter from '@modules/moovies/infra/http/routes/vote.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/admin', ensureAuthenticated, ensureAdmin, usersAdminRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/moovies', ensureAuthenticated, mooviesRoutes);
routes.use('/register-vote', ensureAuthenticated, voteMoovieRouter);
routes.use('/actors', ensureAuthenticated, actorsRoute);

export default routes;
