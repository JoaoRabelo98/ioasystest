import Actor from '@modules/actors/infra/typeorm/entities/Actor';
import FakeActorRepository from '@modules/actors/repositories/fakes/FakeActorRepository';
import CreateActorService from '@modules/actors/services/CreateActorService';
import FakeMoovieRepository from '@modules/moovies/repositories/fakes/FakeMoovieRepository ';
import CreateMoovieService from '../CreateMoovieService';

describe('Craete Moovie Service context', () => {
  let mooviesRepository: FakeMoovieRepository;
  let actorsRepository: FakeActorRepository;
  let service: CreateMoovieService;

  let actor: Actor;

  beforeEach(async () => {
    mooviesRepository = new FakeMoovieRepository();
    actorsRepository = new FakeActorRepository();
    service = new CreateMoovieService(mooviesRepository, actorsRepository);

    const createActorService = new CreateActorService(actorsRepository);

    actor = await createActorService.execute({
      name: 'fake-actor-name',
    });
  });

  it('should be able to create moovie correctly', async () => {
    const createdMoovie = await service.execute({
      actors: [actor.id],
      director: 'fake-director-name',
      genre: 'fake-genre',
      name: 'fake-moovie-name',
    });

    expect(createdMoovie.actors.length).toBe(1);
    expect(
      createdMoovie.actors.findIndex(item => item.id === actor.id),
    ).toBeGreaterThanOrEqual(0);
    expect(createdMoovie.id).not.toBeUndefined();
  });
});
