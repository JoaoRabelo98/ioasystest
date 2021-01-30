import ICreateActorDTO from '../dtos/ICreateActorDTO';
import Actor from '../infra/typeorm/entities/Actor';

export default interface IActorsRepository {
  create(actorData: ICreateActorDTO): Promise<Actor>;
  findById(id: string): Promise<Actor | undefined>;
  findByIds(ids: Array<string>): Promise<Array<Actor>>;
}
