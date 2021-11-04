import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organization' })
export class OrganizationEntity { 

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @AutoMap()
  name: string;

}