import ICreateMoovieDTO from '@modules/moovies/dtos/ICreateMoovieDTO';
import IMooviesRepository from '@modules/moovies/repositories/IMooviesRepository';
import { OptionsTypeOrmGetAllWithoutPagination } from '@seidor-cloud-produtos/typeorm';
import { getRepository, Repository } from 'typeorm';
import Moovie from '../entities/Moovie';

export default class MooviesRepository implements IMooviesRepository {
  private ormRepository: Repository<Moovie>;

  constructor() {
    this.ormRepository = getRepository(Moovie);
  }

  public async create(moovieData: ICreateMoovieDTO): Promise<Moovie> {
    const moovie = this.ormRepository.create(moovieData);

    await this.ormRepository.save(moovie);

    return moovie;
  }

  public async save(moovie: Moovie): Promise<Moovie> {
    return this.ormRepository.save(moovie);
  }

  public async findOne(id: string): Promise<Moovie | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(
    filterOptions: OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Moovie[]> {
    return this.ormRepository.find({
      where: filterOptions.where,
    });
  }
}
