import FakeActorRepository from '@modules/actors/repositories/fakes/FakeActorRepository';
import CreateActorService from '../CreateActorService';

describe('Create Actor Service context', () => {
  let actorRepository: FakeActorRepository;
  let service: CreateActorService;

  beforeEach(() => {
    actorRepository = new FakeActorRepository();
    service = new CreateActorService(actorRepository);
  });

  it('should be able to create a actor correcrtly', async () => {
    const { id } = await service.execute({
      name: 'fake-actor-name',
    });

    expect(id).not.toBeUndefined();
  });
});
