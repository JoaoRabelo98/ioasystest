import ICreateVoteMoovieDTO from '@modules/moovies/dtos/ICreateVoteMoovieDTO';
import VoteMoovie from '@modules/moovies/infra/typeorm/entities/VoteMoovie';
import { uuid } from 'uuidv4';
import IVoteMoovieRepository from '../IVoteMoovieRepository';

export default class FakeVoteMoovieRepository implements IVoteMoovieRepository {
  private voteMoovies: Array<VoteMoovie> = [];

  public async create(moovieData: ICreateVoteMoovieDTO): Promise<VoteMoovie> {
    const voteMoovie = Object.assign(new VoteMoovie(), moovieData, {
      id: uuid(),
    });

    this.voteMoovies.push(voteMoovie);

    return voteMoovie;
  }

  public async findByMoovie(moovieId: string): Promise<VoteMoovie[]> {
    return this.voteMoovies.filter(vote => vote.moovieId === moovieId);
  }
}
