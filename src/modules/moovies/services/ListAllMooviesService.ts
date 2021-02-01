import { inject, injectable } from 'tsyringe';
import Moovie from '../infra/typeorm/entities/Moovie';
import IMooviesRepository from '../repositories/IMooviesRepository';

@injectable()
export default class ListAllMooviesService {
  constructor(
    @inject('MooviesRepository')
    private mooviesRepository: IMooviesRepository,
  ) {}

  public async execute(): Promise<Array<Moovie>> {
    return this.mooviesRepository.findAll();
  }
}
