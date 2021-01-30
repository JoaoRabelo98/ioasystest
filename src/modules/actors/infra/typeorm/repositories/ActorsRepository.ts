import ICreateActorDTO from '@modules/actors/dtos/ICreateActorDTO';
import IActorsRepository from '@modules/actors/repositories/IActorsRepository';
import { getRepository, Repository } from 'typeorm';
import Actor from '../entities/Actor';

export default class ActorsRepository implements IActorsRepository {
  private ormRepository: Repository<Actor>;

  constructor() {
    this.ormRepository = getRepository(Actor);
  }

  public async findByIds(ids: string[]): Promise<Actor[]> {
    return this.ormRepository.findByIds(ids);
  }

  public async create({ name }: ICreateActorDTO): Promise<Actor> {
    const actorTocreate = this.ormRepository.create({
      name,
    });

    return this.ormRepository.save(actorTocreate);
  }

  findById(id: string): Promise<Actor | undefined> {
    return this.ormRepository.findOne(id);
  }
}
