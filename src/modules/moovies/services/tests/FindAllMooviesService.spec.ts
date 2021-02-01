import FakeActorRepository from '@modules/actors/repositories/fakes/FakeActorRepository';
import CreateActorService from '@modules/actors/services/CreateActorService';
import Moovie from '@modules/moovies/infra/typeorm/entities/Moovie';
import FakeMoovieRepository from '@modules/moovies/repositories/fakes/FakeMoovieRepository ';
import CreateMoovieService from '../CreateMoovieService';
import ListAllMooviesService from '../ListAllMooviesService';

describe('Find All Moovies context', () => {
  let mooviesRepository: FakeMoovieRepository;
  let actorsRepository: FakeActorRepository;

  let service: ListAllMooviesService;

  let moovie: Moovie;

  beforeEach(async () => {
    mooviesRepository = new FakeMoovieRepository();
    actorsRepository = new FakeActorRepository();

    service = new ListAllMooviesService(mooviesRepository);
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

  it('should be find moovies correctly', async () => {
    const mooviesFinded = await service.execute({});

    expect(
      mooviesFinded.findIndex(item => item.id === moovie.id),
    ).toBeGreaterThanOrEqual(0);
  });
});
