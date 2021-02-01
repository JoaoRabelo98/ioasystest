import { inject, injectable } from 'tsyringe';
import { formatParamsToTypeOrmOptionsWithoutPaginate } from '@seidor-cloud-produtos/typeorm';
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
    const filterOptions = formatParamsToTypeOrmOptionsWithoutPaginate(filters);

    console.log(filterOptions);
    return this.mooviesRepository.findAll(filterOptions);
  }
}
