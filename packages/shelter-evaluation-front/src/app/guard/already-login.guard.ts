import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.validateUserToken().pipe(
      map(x => x ? this.router.parseUrl('panel') : true),
    );
  }
  
}
