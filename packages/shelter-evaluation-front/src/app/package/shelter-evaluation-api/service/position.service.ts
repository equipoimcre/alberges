import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPositionDto } from 'shelter-evaluation-dto';
import { BaseService } from './base.service';

@Injectable()
export class PositionService extends BaseService {

  path = 'position';

  constructor(
    private httpClient: HttpClient,
  ) {
    super();
  }

  getAll() {
    return this.httpClient.get<UserPositionDto[]>(this.getUrl('all'));
  }
}
