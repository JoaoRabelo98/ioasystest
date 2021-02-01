import { OptionsTypeOrmGetAllWithoutPagination } from '@seidor-cloud-produtos/typeorm';
import ICrateMoovieDTO from '../dtos/ICreateMoovieDTO';
import Moovie from '../infra/typeorm/entities/Moovie';

export default interface IMooviesRepository {
  create(moovieData: ICrateMoovieDTO): Promise<Moovie>;
  save(moovie: Moovie): Promise<Moovie>;
  findOne(id: string): Promise<Moovie | undefined>;
  findAll(
    filterOptions: OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Array<Moovie>>;
}
