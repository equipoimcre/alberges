import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_role' })
export class UserRoleEntity { 

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}