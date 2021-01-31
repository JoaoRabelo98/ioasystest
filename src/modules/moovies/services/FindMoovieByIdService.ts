import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Moovie from '../infra/typeorm/entities/Moovie';
import IMooviesRepository from '../repositories/IMooviesRepository';

@injectable()
export default class FindMoovieByIdService {
  constructor(
    @inject('MooviesRepository')
    private mooviesRepository: IMooviesRepository,
  ) {}

  public async execute(id: string): Promise<Moovie> {
    const moovieFinded = await this.mooviesRepository.findOne(id);

    if (!moovieFinded) {
      throw new AppError('Moovie not found');
    }

    return moovieFinded;
  }
}
