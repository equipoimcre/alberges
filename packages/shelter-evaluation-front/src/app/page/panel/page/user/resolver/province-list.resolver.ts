import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ProvinceDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../../../interface/paginable';
import { ProvinceService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceListResolver implements Resolve<ProvinceDto[]> {
  
  constructor(
    private provinceService: ProvinceService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.provinceService.getAll();
  }
}
