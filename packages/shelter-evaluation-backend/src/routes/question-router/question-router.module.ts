import { Module } from '@nestjs/common';
import { QuestionModule } from '../../package/question/question.module';
import { QuestionController } from './question.controller';

@Module({
  imports: [QuestionModule],
  controllers: [QuestionController]
})
export class QuestionRouterModule {}
