import Actor from '@modules/actors/infra/typeorm/entities/Actor';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Actor)
  @JoinTable()
  actors: Actor[];
}
