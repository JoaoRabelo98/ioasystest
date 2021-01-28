import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '../AuthenticateUserService';

describe('Authenticate User Service context', async () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let service: AuthenticateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new AuthenticateUserService(usersRepository, hashProvider);
  });

  it('should not be able to authenticate user when not find user', async () => {
    expect.hasAssertions();

    try {
      await service.execute({ email: 'fake-mail', password: 'fake-password' });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Incorrect email/password combination');
    }
  });
});
