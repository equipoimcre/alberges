import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDto } from 'shelter-evaluation-dto';
import { UserService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserDto> {

  constructor(
    private userService: UserService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDto> {
    return this.userService.getUserById(route.params.id);
  }
}
