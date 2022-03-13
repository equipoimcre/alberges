import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityDto, ProvinceDto, ShelterDto, UserRoleDto } from 'shelter-evaluation-dto';
import { ROLE } from '../../../../../../common';
import { PaginationComponent } from '../../../../../../components';
import { Paginable } from '../../../../../../interface/paginable';
import { ShelterService } from '../../../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-shelter-search',
  templateUrl: './shelter-search.component.html',
  styleUrls: ['./shelter-search.component.scss'],
})
export class ShelterSearchComponent implements OnInit {
  
  formFilters!: FormGroup;
  role: UserRoleDto | undefined;
  paginableShelter: Paginable<ShelterDto> = {count: 0, data: []};
  provinceList: ProvinceDto[] = [];
  communityList: CommunityDto[] = [];
  
  elementsPerPage = 10;

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shelterService: ShelterService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.role = this.activatedRoute.parent?.parent?.snapshot?.data.currentRole;
    this.communityList = this.activatedRoute.snapshot.data.communityList;
    const provinceList = this.communityList.map( community => community.provinceList);
    this.provinceList = Array.prototype.concat.apply([], provinceList);
    this.initFormFilters();
    if (Object.keys(this.activatedRoute.snapshot.queryParams).length > 0) {
      this.filter();
    }
  }

  filter() {
    if (this.pagination) {
      this.pagination.navigateToFirstPage();
    }
    this.requestShelters();
  }

  reset() {
    this.formFilters.reset();
    this.filter();
  }

  requestShelters(page: number  = 1) {
    const params = {
      ...this.formFilters.value,
      take: this.elementsPerPage,
      skip: this.elementsPerPage * page - this.elementsPerPage,
    };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });
    this.shelterService.filter(params).subscribe(
      response => {
        this.paginableShelter = response;
      },
      error => alert(JSON.stringify(error)),
    )
  }

  getPaht(id: number) {
    const isValidator = this.role!.name === ROLE.VALIDATOR;
    return `/panel/shelter/${isValidator ? 'validate' : 'info'}/` + id;
  }

  isAdmin() {
    return this.role!.name === ROLE.ADMINISTRATOR;
  }

  private initFormFilters() {
    this.formFilters = new FormGroup({
      name: new FormControl(this.activatedRoute.snapshot.queryParams.name),
      provinceId: new FormControl(this.activatedRoute.snapshot.queryParams.provinceId),
      communityId: new FormControl(this.activatedRoute.snapshot.queryParams.communityId),
    });
  }
  
}
