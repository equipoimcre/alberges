import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { UserRoleDto } from 'shelter-evaluation-dto';
import { RoleService } from '../../../package/shelter-evaluation-api/service';

@Injectable()
export class CurrentRoleResolver implements Resolve<UserRoleDto> {
  constructor(private roleService: RoleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.roleService.getCurrent();
  }
}
