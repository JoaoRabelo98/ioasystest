import ICreateVoteMoovieDTO from '../dtos/ICreateVoteMoovieDTO';
import VoteMoovie from '../infra/typeorm/entities/VoteMoovie';

export default interface IVoteMoovieRepository {
  create(voteData: ICreateVoteMoovieDTO): Promise<VoteMoovie>;
  findByMoovie(moovieId: string): Promise<Array<VoteMoovie>>;
}
