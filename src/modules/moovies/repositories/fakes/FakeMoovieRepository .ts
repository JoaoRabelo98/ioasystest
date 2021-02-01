import ICreateMoovieDTO from '@modules/moovies/dtos/ICreateMoovieDTO';
import Moovie from '@modules/moovies/infra/typeorm/entities/Moovie';
import { OptionsTypeOrmGetAllWithoutPagination } from '@seidor-cloud-produtos/typeorm';
import { uuid } from 'uuidv4';
import IMooviesRepository from '../IMooviesRepository';

export default class FakeMoovieRepository implements IMooviesRepository {
  private moovies: Array<Moovie> = [];

  public async create(moovieData: ICreateMoovieDTO): Promise<Moovie> {
    const moovie = Object.assign(new Moovie(), moovieData, { id: uuid() });

    this.moovies.push(moovie);

    return moovie;
  }

  public async save(moovie: Moovie): Promise<Moovie> {
    const indexOfMoovie = this.moovies.findIndex(item => item.id === moovie.id);

    this.moovies[indexOfMoovie] = moovie;

    return moovie;
  }

  public async findOne(id: string): Promise<Moovie | undefined> {
    return this.moovies.find(item => item.id === id);
  }

  public async findAll(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterOptions: OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Moovie[]> {
    return this.moovies;
  }
}
