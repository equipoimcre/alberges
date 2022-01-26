import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProvinceDto } from 'shelter-evaluation-dto';
import { BaseService } from './base.service';

@Injectable()
export class ProvinceService extends BaseService {

  path = 'province';

  constructor(
    private httpClient: HttpClient,
  ) {
    super();
  }

  getAll() {
    return this.httpClient.get<ProvinceDto[]>(this.getUrl('all'));
  }
}
