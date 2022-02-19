import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginDto } from 'shelter-evaluation-dto';
import { StorageService } from '../../../service/storage/storage.service';
import { of } from 'rxjs';

@Injectable()
export class AuthService extends BaseService {
  path = 'auth';
  private STORAGE_KEY_JWT = 'JWT';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
  ) {
    super();
  }

  login(loginDto: LoginDto) {
    return this.httpClient
      .post<{ accessToken: string }>(this.getUrl(`login`), loginDto)
      .pipe(
        tap((login) => {
          this.storageService.save(this.STORAGE_KEY_JWT, login.accessToken);
        }),
      );
  }

  validateUserToken() {
    const token = this.storageService.get(this.STORAGE_KEY_JWT);
    if (token === null && token === undefined && token === '') {
      return of(false);
    }
    return this.httpClient.get<boolean>(this.getUrl(`validate`)).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  getToken() {
    return this.storageService.get(this.STORAGE_KEY_JWT);
  }

  removeToken() {
    this.storageService.remove(this.STORAGE_KEY_JWT);
  }
}
