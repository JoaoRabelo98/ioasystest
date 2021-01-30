import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersAdminRoutes from '@modules/users/infra/http/routes/usersAdmin.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/admin', usersAdminRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
