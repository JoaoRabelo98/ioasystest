import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
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
});
