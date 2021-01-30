import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
