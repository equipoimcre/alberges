import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entity';
import { QuestionServiceService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [QuestionServiceService],
  exports: [QuestionServiceService],
})
export class QuestionModule {}
