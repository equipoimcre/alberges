import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'province' })
export class ProvinceEntity { 

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @AutoMap()
  name: string;

}