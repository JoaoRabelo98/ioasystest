import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';
import InactivateUserService from '../InactivateUserService';

describe('Inactivate User Service context', () => {
  let userRepository: FakeUsersRepository;
  let service: InactivateUserService;
  let createUserService: CreateUserService;
  let hashProvider: FakeHashProvider;

  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(userRepository, hashProvider);
    service = new InactivateUserService(userRepository);
  });

  it('should not be able to inactivate when user is non exists', async () => {
    expect.hasAssertions();

    try {
      await service.execute('fake-user-id');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('User not found');
    }
  });

  it('should be able to inactivate user correctly', async () => {
    const { id } = await createUserService.execute({
      email: 'fake-user-mail',
      name: 'fake-user-name',
      password: 'fake-user-password',
    });

    await service.execute(id);

    const userFinded = await userRepository.findById(id);

    expect(userFinded?.active).toBe(false);
  });
});
