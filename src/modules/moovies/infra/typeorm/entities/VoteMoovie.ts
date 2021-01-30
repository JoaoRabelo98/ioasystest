import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Moovie from './Moovie';

@Entity('vote_movies')
export default class VoteMoovie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rate: number;

  @Column()
  moovieId: string;

  @ManyToOne(() => Moovie)
  @JoinColumn({ name: 'moovieId' })
  moovie: Moovie;
}
