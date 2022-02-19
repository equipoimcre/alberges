import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { QuestionDto } from 'shelter-evaluation-dto';
import { QuestionService } from '../../../../../package/shelter-evaluation-api/service';


@Injectable()
export class QuestionListResolver implements Resolve<QuestionDto[]> {
  constructor(private questionService: QuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.questionService.getAll();
  }
}
