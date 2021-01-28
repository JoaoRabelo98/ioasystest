import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import UpdateUserService from '../UpdateUserService';

describe('Update User Service context', () => {
  let userRepository: FakeUsersRepository;
  let service: UpdateUserService;

  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    service = new UpdateUserService(userRepository);
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
});
