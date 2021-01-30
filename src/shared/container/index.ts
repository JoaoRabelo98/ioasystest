import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IActorsRepository from '@modules/actors/repositories/IActorsRepository';
import ActorsRepository from '@modules/actors/infra/typeorm/repositories/ActorsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository);
container.registerSingleton<IActorsRepository>('ActorsRepository', ActorsRepository);
