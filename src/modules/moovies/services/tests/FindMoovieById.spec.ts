import FakeActorRepository from '@modules/actors/repositories/fakes/FakeActorRepository';
import CreateActorService from '@modules/actors/services/CreateActorService';
import Moovie from '@modules/moovies/infra/typeorm/entities/Moovie';
import FakeMoovieRepository from '@modules/moovies/repositories/fakes/FakeMoovieRepository ';
import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import CreateMoovieService from '../CreateMoovieService';
import FindMoovieByIdService from '../FindMoovieByIdService';

describe('Find Moovie by Id context', () => {
  let mooviesRepository: FakeMoovieRepository;
  let actorsRepository: FakeActorRepository;

  let service: FindMoovieByIdService;

  let moovie: Moovie;

  beforeEach(async () => {
    mooviesRepository = new FakeMoovieRepository();
    actorsRepository = new FakeActorRepository();

    service = new FindMoovieByIdService(mooviesRepository);
    const createActorService = new CreateActorService(actorsRepository);

    const actor = await createActorService.execute({
      name: 'fake-name',
    });

    const createMoovieService = new CreateMoovieService(
      mooviesRepository,
      actorsRepository,
    );

    moovie = await createMoovieService.execute({
      actors: [actor.id],
      director: 'fake-director',
      genre: 'fake-genre',
      name: 'fake-name',
    });
  });

  it('should be find moovie correctly', async () => {
    const { id, name, director } = await service.execute(moovie.id);

    expect(id).toBe(moovie.id);
    expect(name).toBe(moovie.name);
    expect(director).toBe(moovie.director);
  });

  it('should not be find moovie when id is invalid', async () => {
    try {
      await service.execute(uuid());
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Moovie not found');
    }
  });
});
