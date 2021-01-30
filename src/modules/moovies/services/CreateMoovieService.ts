import IActorsRepository from '@modules/actors/repositories/IActorsRepository';
import { inject, injectable } from 'tsyringe';
import ICrateMoovieWithActorDTO from '../dtos/ICreateMoovieWithActorDTO';
import Moovie from '../infra/typeorm/entities/Moovie';
import IMooviesRepository from '../repositories/IMooviesRepository';

@injectable()
export default class CreateMoovieService {
  constructor(
    @inject('MooviesRepository')
    private mooviesRepository: IMooviesRepository,

    @inject('ActorsRepository')
    private actorsRepository: IActorsRepository,
  ) {}

  public async execute({
    name,
    genre,
    director,
    actors,
  }: ICrateMoovieWithActorDTO): Promise<Moovie> {
    const moovie = await this.mooviesRepository.create({
      name,
      genre,
      director,
    });

    moovie.actors = await this.actorsRepository.findByIds(actors);

    return this.mooviesRepository.save(moovie);
  }
}
