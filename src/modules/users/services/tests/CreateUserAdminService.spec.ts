import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import CreateUserAdminService from '../CreateUserAdminService';

describe('Create User Admin Service context', () => {
  let hashProvider: FakeHashProvider;
  let userRepository: FakeUsersRepository;
  let service: CreateUserAdminService;

  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    userRepository = new FakeUsersRepository();
    service = new CreateUserAdminService(userRepository, hashProvider);
  });

  it('should ble able to create a admin correctly', async () => {
    const createdAdmin = await service.execute({
      email: 'fake-mail@mail.com',
      name: 'fake-name',
      password: 'fake-password',
    });

    expect(createdAdmin.id).not.toBeUndefined();
    expect(createdAdmin.isAdmin).toBe(true);
  });

  it('should not be able to create a admin when email is already using', async () => {
    expect.hasAssertions();

    await service.execute({
      email: 'fake-mail@mail.com',
      name: 'fake-name',
      password: 'fake-password',
    });
    try {
      await service.execute({
        email: 'fake-mail@mail.com',
        name: 'fake-name',
        password: 'fake-password',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Email address already used');
    }
  });
});
