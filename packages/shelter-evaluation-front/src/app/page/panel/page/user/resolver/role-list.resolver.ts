import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserRoleDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../../../interface/paginable';
import { RoleService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root'
})
export class RoleListResolver implements Resolve<UserRoleDto[]> {

  constructor(
    private roleService: RoleService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.roleService.getAll();
  }
}
