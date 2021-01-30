import ICreateActorDTO from '@modules/actors/dtos/ICreateActorDTO';
import Actor from '@modules/actors/infra/typeorm/entities/Actor';
import { uuid } from 'uuidv4';
import IActorsRepository from '../IActorsRepository';

export default class FakeActorRepository implements IActorsRepository {
  private actors: Array<Actor> = [];

  public async create({ name }: ICreateActorDTO): Promise<Actor> {
    const actor = {
      id: uuid(),
      name,
    } as Actor;

    this.actors.push(actor);

    return actor;
  }

  public async findById(id: string): Promise<Actor | undefined> {
    return this.actors.find(actor => actor.id === id);
  }
}
