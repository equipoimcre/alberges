import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService extends BaseService {

  private path = 'auth';

  constructor(
    private httpClient: HttpClient,
  ) {
    super();
   }

  login(loginDto: any) {
    return this.httpClient.post<{accessToken: string}>(this.getUrl(`${this.path}/login`), loginDto)
      .pipe(
        tap(login => {
          localStorage.setItem('JWT', login.accessToken);
        })
      );
  }
}
