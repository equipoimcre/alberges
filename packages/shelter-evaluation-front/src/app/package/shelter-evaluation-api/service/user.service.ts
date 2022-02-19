import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../interface/paginable';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
  path = 'user';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getUserById(id: number) {
    return this.httpClient.get<UserDto>(this.getUrl(`?id=${id}`));
  }

  getAllUser() {
    return this.httpClient.get<Paginable<UserDto>>(this.getUrl('all'));
  }

  createUser(user: UserDto) {
    return this.httpClient.post<UserDto>(this.getUrl(''), user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(this.getUrl(id.toString()));
  }

  updateUser(userDto: UserDto) {
    return this.httpClient.put<UserDto>(this.getUrl(''), userDto);
  }

  changePassword(id: number, password: string) {
    return this.httpClient.patch<UserDto>(this.getUrl(`${id}/password`), {
      password,
    });
  }
}
