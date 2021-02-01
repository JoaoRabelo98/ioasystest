/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import Moovie from '../infra/typeorm/entities/Moovie';
import IMooviesRepository from '../repositories/IMooviesRepository';
import IListAllMooviesOptionsDTO from '../dtos/IListAllMooviesOptionsDTO';

@injectable()
export default class ListAllMooviesService {
  constructor(
    @inject('MooviesRepository')
    private mooviesRepository: IMooviesRepository,
  ) {}

  public async execute(filters: IListAllMooviesOptionsDTO): Promise<Array<Moovie>> {
    return this.mooviesRepository.findAll(filters);
  }
}
