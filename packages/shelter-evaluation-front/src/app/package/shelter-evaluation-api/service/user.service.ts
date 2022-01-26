import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../interface/paginable';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {

  path = 'user';

  constructor(
    private httpClient: HttpClient,
  ) {
    super();
  }

  getUserById(id: number) {
    return this.httpClient.get<UserDto>(this.getUrl(`?id=${id}`));
  }

  getAllUser() {
    return this.httpClient.get<Paginable<UserDto>>(this.getUrl('all'));
  }

  deleteUser(id: number) {
    return this.httpClient.delete(this.getUrl(id.toString()));
  }
}
