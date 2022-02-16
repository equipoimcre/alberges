import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ShelterEntity } from './shelter.entity';
import { QuestionEntity } from '../../question';

@Entity({ name: 'shelter' })
export class ShelterResponseEntity { 

  @PrimaryColumn({name: 'question_id'})
  @AutoMap()
  questionId: number;

  @PrimaryColumn({name: 'shelter_id'})
  @AutoMap()
  shelterId: number;

  @Column('boolean')
  @AutoMap()
  response: boolean;

  @ManyToOne(() => ShelterEntity, shelter => shelter.id)
  public post: ShelterEntity;

  @ManyToOne(() => QuestionEntity, question => question.id)
  public category: QuestionEntity;
}