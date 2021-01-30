import User from '@modules/users/infra/typeorm/entities/User';
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

  @Column()
  userId: string;

  @ManyToOne(() => Moovie)
  @JoinColumn({ name: 'moovieId' })
  moovie: Moovie;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
