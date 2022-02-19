import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationDto } from 'shelter-evaluation-dto';
import { BaseService } from './base.service';

@Injectable()
export class OrganizationService extends BaseService {
  path = 'organization';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllProvince() {
    return this.httpClient.get<OrganizationDto[]>(this.getUrl('all'));
  }
}
