import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommunityDto, ProvinceDto, ShelterDto } from 'shelter-evaluation-dto';
import { Paginable } from 'src/app/interface/paginable';
import { ShelterService } from 'src/app/package/shelter-evaluation-api/service';

@Component({
  selector: 'app-shelter-search',
  templateUrl: './shelter-search.component.html',
  styleUrls: ['./shelter-search.component.scss'],
})
export class ShelterSearchComponent implements OnInit {
  
  formFilters!: FormGroup;

  paginableShelter: Paginable<ShelterDto> = {count: 0, data: []};
  provinceList: ProvinceDto[] = [];
  communityList: CommunityDto[] = [];

  currentPage = 1;
  pageList: number[] = [];
  quantityOfElementsToSearch = 10;
  
  constructor(
    private activatedRouted: ActivatedRoute,
    private shelterService: ShelterService,
    private serviceDetector: DeviceDetectorService,
    private router: Router,
  ) {}

  get lastPage() {
    const lastPage = this.paginableShelter.count / this.quantityOfElementsToSearch;
    const lastPageInt = parseInt(lastPage.toString())
    return lastPageInt === lastPage ? lastPageInt : lastPageInt + 1 ;
  }

  ngOnInit() {
    this.communityList = this.activatedRouted.snapshot.data.communityList;
    const provinceList = this.communityList.map( community => community.provinceList);
    this.provinceList = Array.prototype.concat.apply([], provinceList);
    this.initFormFilters();
    if (Object.keys(this.activatedRouted.snapshot.queryParams).length > 0) {
      this.filter();
    }
  }

  filter() {
    this.currentPage = 1;
    this.requestShelters();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.requestShelters();
  }

  backPage() {
    const backPage = this.currentPage - 1;
    if (backPage > 0) {
      this.currentPage--;
      this.requestShelters();
    }    
  }

  nextPage() {
    const nextPapage = this.currentPage + 1;
    if (nextPapage <= this.lastPage) {
      this.currentPage++;
      this.requestShelters();
    }
  }

  reset() {
    this.formFilters.reset();
    this.filter();
  }

  private initFormFilters() {
    this.formFilters = new FormGroup({
      name: new FormControl(this.activatedRouted.snapshot.queryParams.name),
      provinceId: new FormControl(this.activatedRouted.snapshot.queryParams.provinceId),
      communityId: new FormControl(this.activatedRouted.snapshot.queryParams.communityId),
    });
  }

  private requestShelters() {
    const params = {
      ...this.formFilters.value,
      take: this.quantityOfElementsToSearch,
      skip: this.quantityOfElementsToSearch * this.currentPage - this.quantityOfElementsToSearch,
    };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRouted,
        queryParams: params,
        queryParamsHandling: 'merge'
      });
    this.shelterService.filter(params).subscribe(
      response => {
        this.paginableShelter = response;
        this.calculatePageList();
      },
      error => alert(JSON.stringify(error)),
    )
  }

  private calculatePageList() {
    this.pageList = [];
    let minusCounter = 0;
    const totalPagesToShow = this.serviceDetector.isMobile() ? 3 : 5;
    for (let i = 0; i < totalPagesToShow; i++) {
      const nextPage = this.currentPage + i;
      if (nextPage < this.lastPage) {
        this.pageList.push(nextPage);
      } else if (this.currentPage - minusCounter > 1) {
        this.pageList.unshift(this.currentPage - minusCounter);
        minusCounter++;
      }
    }
  }
}
