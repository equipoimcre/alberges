import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunityDto } from 'shelter-evaluation-dto';
import { BaseService } from './base.service';

@Injectable()
export class Communityervice extends BaseService {
  path = 'community';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll() {
    return this.httpClient.get<CommunityDto[]>(this.getUrl('all'));
  }
}
