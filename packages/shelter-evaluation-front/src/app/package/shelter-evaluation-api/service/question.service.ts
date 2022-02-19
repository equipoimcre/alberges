import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionDto } from 'shelter-evaluation-dto';
import { BaseService } from './base.service';

@Injectable()
export class QuestionService extends BaseService {
  path = 'question';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll() {
    return this.httpClient.get<QuestionDto[]>(this.getUrl('all'));
  }
}
