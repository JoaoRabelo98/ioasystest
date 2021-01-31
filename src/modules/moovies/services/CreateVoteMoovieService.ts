import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateVoteMoovieDTO from '../dtos/ICreateVoteMoovieDTO';
import VoteMoovie from '../infra/typeorm/entities/VoteMoovie';
import IMooviesRepository from '../repositories/IMooviesRepository';
import IVoteMoovieRepository from '../repositories/IVoteMoovieRepository';

@injectable()
export default class CreateVoteMoovieService {
  constructor(
    @inject('VoteMooviesRepository')
    private voteMooviesRepository: IVoteMoovieRepository,

    @inject('MooviesRepository')
    private mooviesRepository: IMooviesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    moovieId,
    rate,
    userId,
  }: ICreateVoteMoovieDTO): Promise<VoteMoovie> {
    if (rate < 1 || rate > 4) {
      throw new AppError('Invalid rate of vote');
    }

    const moovieExists = await this.mooviesRepository.findOne(moovieId);

    if (!moovieExists) {
      throw new AppError('Moovie not found');
    }

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User not found');
    }

    return this.voteMooviesRepository.create({
      moovieId,
      rate,
      userId,
    });
  }
}
