import ICreateVoteMoovieDTO from '@modules/moovies/dtos/ICreateVoteMoovieDTO';
import IVoteMoovieRepository from '@modules/moovies/repositories/IVoteMoovieRepository';
import { getRepository, Repository } from 'typeorm';
import VoteMoovie from '../entities/VoteMoovie';

export default class VoteMoovieRepository implements IVoteMoovieRepository {
  private ormRepository: Repository<VoteMoovie>;

  constructor() {
    this.ormRepository = getRepository(VoteMoovie);
  }

  public async create(voteData: ICreateVoteMoovieDTO): Promise<VoteMoovie> {
    const voteMoovie = this.ormRepository.create(voteData);

    await this.ormRepository.save(voteMoovie);

    return voteMoovie;
  }
}
