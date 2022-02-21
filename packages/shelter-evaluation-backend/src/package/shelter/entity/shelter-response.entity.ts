import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ShelterEntity } from './shelter.entity';
import { QuestionEntity } from '../../question';

@Entity({ name: 'shelter_response' })
export class ShelterResponseEntity {
  @PrimaryColumn({ name: 'question_id' })
  @AutoMap()
  questionId: number;

  @PrimaryColumn({ name: 'shelter_id' })
  @AutoMap()
  shelterId: number;

  @Column('boolean')
  @AutoMap()
  response: boolean;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.id)
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: ShelterEntity;


  @ManyToOne(() => QuestionEntity, (question) => question.id)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: QuestionEntity;
}
