import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserPositionDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../../../interface/paginable';
import { PositionService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root'
})
export class PositionListResolver implements Resolve<UserPositionDto[]> {

  constructor(
    private positionService: PositionService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.positionService.getAll();
  }
}
