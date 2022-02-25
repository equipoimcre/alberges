import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input()
  totalElements: number = 0;
  @Input()
  elementsPerPage: number = 0;

  @Output()
  navigateToPage = new EventEmitter<number>();

  currentPage = 1;
  pageList: number[] = [];

  get lastPage() {
    const lastPage = this.totalElements / this.elementsPerPage;
    const lastPageInt = parseInt(lastPage.toString())
    return lastPageInt === lastPage ? lastPageInt : lastPageInt + 1 ;
  }
  
  constructor(
    private serviceDetector: DeviceDetectorService,
  ) {}
 
  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePageList();
  }

  navigateToFirstPage() {
    this.currentPage = 1;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.emitPage();
  }

  backPage() {
    const backPage = this.currentPage - 1;
    if (backPage > 0) {
      this.currentPage--;
      this.emitPage();
    }    
  }

  nextPage() {
    const nextPapage = this.currentPage + 1;
    if (nextPapage <= this.lastPage) {
      this.currentPage++;
      this.emitPage();
    }
  }

  private calculatePageList() {
    this.pageList = [];
    let minusCounter = 0;
    const totalPagesToShow = this.serviceDetector.isMobile() ? 3 : 5;
    if (this.lastPage  <= totalPagesToShow) {
      for (let i = 1; i <= this.lastPage; i++) {
        this.pageList.push(i);
      }
    } else {
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

  private emitPage() {
    this.navigateToPage.emit(this.currentPage);
    this.calculatePageList();
  }
}
