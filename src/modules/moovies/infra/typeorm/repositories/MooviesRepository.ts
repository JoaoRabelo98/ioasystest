/* eslint-disable no-restricted-syntax */
import ICreateMoovieDTO from '@modules/moovies/dtos/ICreateMoovieDTO';
import IListAllMooviesOptionsDTO from '@modules/moovies/dtos/IListAllMooviesOptionsDTO';
import IMooviesRepository from '@modules/moovies/repositories/IMooviesRepository';
import { getRepository, Raw, Repository } from 'typeorm';
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

  public async findAll(filterOptions: IListAllMooviesOptionsDTO): Promise<Moovie[]> {
    let whereClause: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(filterOptions)) {
      whereClause = {
        ...whereClause,
        [key]: Raw(alias => `CAST(${alias} AS VARCHAR) ILIKE '%${value}%'`),
      };
    }

    return this.ormRepository.find({
      ...whereClause,
    });
  }
}
