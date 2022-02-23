import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  quantityOfElementsToSearch = 5;
  totalPagesToShow = 10;
  
  constructor(
    private activatedRouted: ActivatedRoute,
    private shelterService: ShelterService,
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
  }

  filter() {
    this.currentPage = 1;
    this.requestShelters();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.requestShelters();
  }

  getNextPages() {
    const nextPageList = [];
    let minusCounter = 0;
    for (let i = 0; i < this.totalPagesToShow; i++) {
      const nextPage = this.currentPage + i + 1;
      if (nextPage < this.lastPage) {
        nextPageList.push(nextPage);
      } else if (this.currentPage - minusCounter > 1) {
        nextPageList.unshift(this.currentPage - minusCounter);
        minusCounter++;
      }
    }
    return nextPageList;
  }

  private initFormFilters() {
    this.formFilters = new FormGroup({
      name: new FormControl(),
      provinceId: new FormControl(),
      communityId: new FormControl(),
    });
  }

  private requestShelters() {
    this.shelterService.filter({
      ...this.formFilters.value,
      take: this.quantityOfElementsToSearch,
      skip: this.quantityOfElementsToSearch * this.currentPage - this.quantityOfElementsToSearch,
    }).subscribe(
      response => this.paginableShelter = response,
      error => alert(JSON.stringify(error)),
    )
  }
}
