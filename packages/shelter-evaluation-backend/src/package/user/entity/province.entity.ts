import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'province' })
export class ProvinceEntity { 

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}