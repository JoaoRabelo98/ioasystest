import ICreateActorDTO from '../dtos/ICreateActorDTO';
import Actor from '../infra/typeorm/entities/Actor';

export default interface IActorsRepository {
  crate(actorDate: ICreateActorDTO): Promise<Actor>;
  findById(id: string): Promise<Actor | undefined>;
}
