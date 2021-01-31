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

  public async execute(id: string): Promise<Moovie & { averageOfVotes: number }> {
    const moovieFinded = await this.mooviesRepository.findOne(id);

    if (!moovieFinded) {
      throw new AppError('Moovie not found');
    }

    let average = 0;

    if (moovieFinded.votes && moovieFinded.votes.length > 0) {
      average = moovieFinded.votes.reduce((accumulator, { rate }) => {
        const currentAverage = rate / moovieFinded.votes.length;

        return accumulator + currentAverage;
      }, 0);
    }
    return {
      ...moovieFinded,
      averageOfVotes: Number(average.toFixed(2)),
    };
  }
}
