import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IActorsRepository from '@modules/actors/repositories/IActorsRepository';
import ActorsRepository from '@modules/actors/infra/typeorm/repositories/ActorsRepository';
import IMooviesRepository from '@modules/moovies/repositories/IMooviesRepository';
import MooviesRepository from '@modules/moovies/infra/typeorm/repositories/MooviesRepository';
import IVoteMoovieRepository from '@modules/moovies/repositories/IVoteMoovieRepository';
import VoteMoovieRepository from '@modules/moovies/infra/typeorm/repositories/VoteMoovieRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository);
container.registerSingleton<IActorsRepository>('ActorsRepository', ActorsRepository);
container.registerSingleton<IMooviesRepository>(
  'MooviesRepository',
  MooviesRepository,
);
container.registerSingleton<IVoteMoovieRepository>(
  'VoteMooviesRepository',
  VoteMoovieRepository,
);
