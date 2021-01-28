import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';

describe('Create User Service context', async () => {
  let hashProvider: FakeHashProvider;
  let usersRepository: FakeUsersRepository;
  let service: CreateUserService;

  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    service = new CreateUserService(usersRepository, hashProvider);
  });

  it('should be able to create user correctly', async () => {
    const fakePassword = `${Date.now()}`;
    const fakeMail = `${Date.now()}@mail.com`;
    const { id, password, name, email } = await service.execute({
      email: fakeMail,
      name: 'John Doe',
      password: fakePassword,
    });

    expect(id).not.toBeUndefined();
    expect(password).toBe(fakePassword);
    expect(name).toBe('John Doe');
    expect(email).toBe(fakeMail);
  });

  it('should not be able to create user when email is already used', async () => {
    const fakePassword = `${Date.now()}`;
    const fakeMail = `${Date.now()}@mail.com`;
    await service.execute({
      email: fakeMail,
      name: 'John Doe',
      password: fakePassword,
    });

    try {
      await service.execute({
        email: fakeMail,
        name: 'Fake John Doe',
        password: fakePassword,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Email address already used');
    }
  });
});
