import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actors')
export default class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
