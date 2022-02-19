import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { OrganizationDto } from 'shelter-evaluation-dto';
import { Paginable } from '../../../../../interface/paginable';
import { OrganizationService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationListResolver implements Resolve<OrganizationDto[]> {
  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.organizationService.getAllProvince();
  }
}
