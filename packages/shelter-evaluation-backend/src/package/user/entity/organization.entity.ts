import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organization' })
export class OrganizationEntity { 

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}