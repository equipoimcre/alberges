import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ShelterDto } from 'shelter-evaluation-dto';
import { ShelterService } from '../../../../../package/shelter-evaluation-api/service';

@Injectable()
export class ShelterResolver implements Resolve<ShelterDto> {
  constructor(private shelterService: ShelterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.shelterService.getShelter(route.params.id);
  }
}
