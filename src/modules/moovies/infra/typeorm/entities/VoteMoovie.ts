import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vote_movies')
export default class VoteMoovie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rate: number;
}
