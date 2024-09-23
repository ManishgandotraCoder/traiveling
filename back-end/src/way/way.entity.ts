import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Way {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text')
  route?: string;

  @Column()
  time?: string;

  @Column()
  email?: string;
}
