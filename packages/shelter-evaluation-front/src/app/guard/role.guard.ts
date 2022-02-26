import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ROLE } from 'shelter-evaluation-dto';
import { RoleService } from '../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(
    private roleService: RoleService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree 
  {
    const roles = route.data.roles as Array<ROLE>;
    return this.roleService.getCurrent().pipe(
      map((x) => (roles.includes(x.name) ? true : this.getPanelRoute())),
      catchError(() => of(this.getPanelRoute())),
    )
  }

  private getPanelRoute() {
    return this.router.parseUrl('panel');
  }
}
