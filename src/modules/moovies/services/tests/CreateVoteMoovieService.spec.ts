import Actor from '@modules/actors/infra/typeorm/entities/Actor';
import FakeActorRepository from '@modules/actors/repositories/fakes/FakeActorRepository';
import CreateActorService from '@modules/actors/services/CreateActorService';
import Moovie from '@modules/moovies/infra/typeorm/entities/Moovie';
import FakeMoovieRepository from '@modules/moovies/repositories/fakes/FakeMoovieRepository ';
import FakeVoteMoovieRepository from '@modules/moovies/repositories/fakes/FakeVoteMoovieRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import CreateMoovieService from '../CreateMoovieService';
import CreateVoteMoovieService from '../CreateVoteMoovieService';

describe('Create Vote Moovie Service context', () => {
  let voteMooviesRepository: FakeVoteMoovieRepository;
  let mooviesRepository: FakeMoovieRepository;
  let userRepository: FakeUsersRepository;
  let actorsRepository: FakeActorRepository;

  let hashProvider: FakeHashProvider;

  let service: CreateVoteMoovieService;

  let moovie: Moovie;
  let actor: Actor;
  let user: User;

  beforeEach(async () => {
    voteMooviesRepository = new FakeVoteMoovieRepository();
    mooviesRepository = new FakeMoovieRepository();
    userRepository = new FakeUsersRepository();
    actorsRepository = new FakeActorRepository();

    hashProvider = new FakeHashProvider();

    service = new CreateVoteMoovieService(
      voteMooviesRepository,
      mooviesRepository,
      userRepository,
    );
    const createUserService = new CreateUserService(userRepository, hashProvider);
    const createMoovieService = new CreateMoovieService(
      mooviesRepository,
      actorsRepository,
    );
    const createActorService = new CreateActorService(actorsRepository);

    user = await createUserService.execute({
      email: 'fake-mail',
      name: 'fake-name',
      password: 'fake-password',
    });

    actor = await createActorService.execute({
      name: 'fake-name',
    });

    moovie = await createMoovieService.execute({
      actors: [actor.id],
      director: 'fake-director',
      genre: 'fake-genre',
      name: 'fake-name',
    });
  });

  it('should be able to create a vote of moovie correctly', async () => {
    const voteCreated = await service.execute({
      moovieId: moovie.id,
      rate: 4,
      userId: user.id,
    });

    expect(voteCreated.id).not.toBeUndefined();
  });

  it('should not ble able to create a vote when rate is greater then 4', async () => {
    expect.hasAssertions();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await service.execute(<any>{
        moovieId: moovie.id,
        rate: 5,
        userId: user.id,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Invalid rate of vote');
    }
  });

  it('should not ble able to create a vote when rate is less then 1', async () => {
    expect.hasAssertions();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await service.execute(<any>{
        moovieId: moovie.id,
        rate: 0,
        userId: user.id,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Invalid rate of vote');
    }
  });

  it('should not ble able to create a vote when send invalid moovie', async () => {
    expect.hasAssertions();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await service.execute(<any>{
        moovieId: moovie.id,
        rate: 3,
        userId: uuid(),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('User not found');
    }
  });

  it('should not ble able to create a vote when send invalid user', async () => {
    expect.hasAssertions();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await service.execute(<any>{
        moovieId: uuid(),
        rate: 3,
        userId: user.id,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Moovie not found');
    }
  });
});
