import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { QuestionDto } from 'shelter-evaluation-dto'
import { QuestionEntity } from '../../package';
import { mapper } from '../../utils';
import { QuestionServiceService } from '../../package/question/service';
import { JwtAuthGuard } from '../../guard';

@Controller('question')
@ApiSecurity('basic')
@ApiTags('question')
export class QuestionController {

  constructor(
    private questionService: QuestionServiceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: QuestionDto,
  })
  @Get('all')
  async getAll() {
    const questionList = await this.questionService.getAll();
    return mapper.mapArray(questionList, QuestionDto, QuestionEntity)
  }

}
