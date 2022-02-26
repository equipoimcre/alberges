import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRoleDto } from 'shelter-evaluation-dto';
import { BaseService } from './base.service';

@Injectable()
export class RoleService extends BaseService {
  path = 'role';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll() {
    return this.httpClient.get<UserRoleDto[]>(this.getUrl('all'));
  }

  getCurrent() {
    return this.httpClient.get<UserRoleDto>(this.getUrl('current'));
  }
}
