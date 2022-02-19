import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CommunityDto, OrganizationDto } from 'shelter-evaluation-dto';
import { Communityervice } from '../../../../../package/shelter-evaluation-api/service';

@Injectable()
export class CommunityListResolver implements Resolve<CommunityDto[]> {
  constructor(private communityService: Communityervice) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.communityService.getAll();
  }
}
