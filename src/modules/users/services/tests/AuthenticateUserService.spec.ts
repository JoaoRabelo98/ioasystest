import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserAdminService from '../CreateUserAdminService';
import CreateUserService from '../CreateUserService';
import InactivateUserService from '../InactivateUserService';

describe('Authenticate User Service context', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let service: AuthenticateUserService;
  let createUserService: CreateUserService;
  let createUserAdminService: CreateUserAdminService;
  let inactivateUserService: InactivateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserAdminService = new CreateUserAdminService(
      usersRepository,
      hashProvider,
    );
    inactivateUserService = new InactivateUserService(usersRepository);
    createUserService = new CreateUserService(usersRepository, hashProvider);
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

  it('should not be able to authenticate user when password and email not match', async () => {
    expect.hasAssertions();

    await createUserService.execute({
      email: 'fake-email',
      name: 'fake-name',
      password: 'fake-password',
    });

    try {
      await service.execute({ email: 'fake-email', password: 'invalid-password' });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Incorrect email/password combination');
    }
  });

  it('should be able to authenticate user correctly', async () => {
    const userCreated = await createUserService.execute({
      email: 'fake-email',
      name: 'fake-name',
      password: 'fake-password',
    });

    const { token, user } = await service.execute({
      email: 'fake-email',
      password: 'fake-password',
    });

    expect(user).toEqual(userCreated);
    expect(token).not.toBeUndefined();
  });

  it('should be able to authenticate user admin correctly', async () => {
    const userCreated = await createUserAdminService.execute({
      email: 'fake-email',
      name: 'fake-name',
      password: 'fake-password',
    });

    const { token, user } = await service.execute({
      email: 'fake-email',
      password: 'fake-password',
    });

    expect(user).toEqual(userCreated);
    expect(token).not.toBeUndefined();
  });

  it('should not authenticate when user is disable', async () => {
    expect.hasAssertions();
    try {
      const userCreated = await createUserService.execute({
        email: 'fake-email',
        name: 'fake-name',
        password: 'fake-password',
      });

      await inactivateUserService.execute(userCreated.id);

      await service.execute({
        email: 'fake-email',
        password: 'fake-password',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Your user is disabled');
    }
  });
});
