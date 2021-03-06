import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userDataToUpdate: IRequest): Promise<User> {
    const findedUser = await this.usersRepository.findById(userDataToUpdate.id);

    if (!findedUser) {
      throw new AppError('User not found');
    }

    const user = await this.usersRepository.save(
      Object.assign(findedUser, userDataToUpdate),
    );

    return user;
  }
}
