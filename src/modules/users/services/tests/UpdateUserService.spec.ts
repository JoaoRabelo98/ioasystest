import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import CreateUserService from '../CreateUserService';
import UpdateUserService from '../UpdateUserService';

describe('Update User Service context', () => {
  let userRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let service: UpdateUserService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new UpdateUserService(userRepository);
    createUserService = new CreateUserService(userRepository, hashProvider);
  });

  it('should not be able to update when user is invalid', async () => {
    expect.hasAssertions();

    try {
      await service.execute({
        id: uuid(),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('User not found');
    }
  });

  it('should be able to update a user correclty', async () => {
    const { id } = await createUserService.execute({
      email: 'fake-user-mail',
      name: 'fake-user-name',
      password: 'fake-user-password',
    });

    const userUpdated = await service.execute({
      id,
      email: 'fake-mail',
      name: 'fake-name',
    });

    expect(userUpdated.id).toBe(id);
    expect(userUpdated.email).toBe('fake-mail');
    expect(userUpdated.name).toBe('fake-name');
  });

  it('should be able to update a email of user', async () => {
    const { id } = await createUserService.execute({
      email: 'fake-user-mail',
      name: 'fake-user-name',
      password: 'fake-user-password',
    });

    const userUpdated = await service.execute({
      id,
      email: 'fake-mail',
    });

    expect(userUpdated.id).toBe(id);
    expect(userUpdated.email).toBe('fake-mail');
    expect(userUpdated.name).toBe('fake-user-name');
  });

  it('should be able to update a name of user', async () => {
    const { id } = await createUserService.execute({
      email: 'fake-user-mail',
      name: 'fake-user-name',
      password: 'fake-user-password',
    });

    const userUpdated = await service.execute({
      id,
      name: 'fake-name',
    });

    expect(userUpdated.id).toBe(id);
    expect(userUpdated.email).toBe('fake-user-mail');
    expect(userUpdated.name).toBe('fake-name');
  });
});
