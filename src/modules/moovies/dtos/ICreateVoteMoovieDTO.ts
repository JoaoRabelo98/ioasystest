export default interface ICreateVoteMoovieDTO {
  rate: 1 | 2 | 3 | 4;

  moovieId: string;

  userId: string;
}
