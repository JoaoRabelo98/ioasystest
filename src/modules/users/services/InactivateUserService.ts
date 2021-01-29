import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class InactivateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findedUser = await this.userRepository.findById(id);

    if (!findedUser) {
      throw new AppError('User not found');
    }

    findedUser.active = false;

    await this.userRepository.save(findedUser);
  }
}
