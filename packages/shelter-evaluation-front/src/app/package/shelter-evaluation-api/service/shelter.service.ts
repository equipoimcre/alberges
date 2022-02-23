import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterDto } from 'shelter-evaluation-dto';
import { Paginable } from 'src/app/interface/paginable';
import { BaseService } from './base.service';

@Injectable()
export class ShelterService extends BaseService {
  path = 'shelter';

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(shelterDto: ShelterDto) {
    return this.httpClient.post<ShelterDto>(this.getUrl(''), shelterDto);
  }

  getShelter(id: string) {
    return this.httpClient.get<ShelterDto>(this.getUrl(id));
  }

  validate(id: number) {
    return this.httpClient.patch(this.getUrl(`validate/${id}`), {validate: true});
  }

  filter(filters: any) {
    const params: any = {}
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null) {
        params[key] = filters[key];
      }
    })
    return this.httpClient.get<Paginable<ShelterDto>>(this.getUrl(''), { params });
  }
}
