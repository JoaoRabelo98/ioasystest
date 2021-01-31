import Actor from '@modules/actors/infra/typeorm/entities/Actor';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VoteMoovie from './VoteMoovie';

@Entity('moovies')
export default class Moovie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @ManyToMany(() => Actor, { eager: true })
  @JoinTable()
  actors: Actor[];

  @OneToMany(() => VoteMoovie, votes => votes.moovie, { eager: true })
  votes: Array<VoteMoovie>;
}
