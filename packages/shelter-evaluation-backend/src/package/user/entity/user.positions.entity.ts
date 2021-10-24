import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_position' })
export class UserPositionEntity { 

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}