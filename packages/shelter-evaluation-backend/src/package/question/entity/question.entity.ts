import { AutoMap } from '@automapper/classes';
import { ProvinceEntity } from '../../user';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'question' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  question: string;
}
