import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../../../interface/paginable';
import { UserService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<Paginable<UserDto>> {

  constructor(
    private userService: UserService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paginable<UserDto>> {
    return this.userService.getAllUser();
  }
}
