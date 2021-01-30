import { inject, injectable } from 'tsyringe';
import ICreateActorDTO from '../dtos/ICreateActorDTO';
import Actor from '../infra/typeorm/entities/Actor';
import IActorsRepository from '../repositories/IActorsRepository';

@injectable()
export default class CreateActorService {
  constructor(
    @inject('ActorsRepository')
    private actorsRepository: IActorsRepository,
  ) {}

  public async execute({ name }: ICreateActorDTO): Promise<Actor> {
    return this.actorsRepository.create({
      name,
    });
  }
}
