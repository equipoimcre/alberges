import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
})
export class QuestionModule {}
