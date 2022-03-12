import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'shelter-evaluation-dto';
import { PaginationComponent } from '../../../../../../components';
import { Paginable } from '../../../../../../interface/paginable';
import { UserService } from '../../../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent | undefined;
  
  userPaginable: Paginable<UserDto> = {count: 0, data: []};
  elementsPerPage = 10;

  userForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userPaginable = this.activatedRoute.snapshot.data.userPaginable;
    this.initUserForm();
    if (Object.keys(this.activatedRoute.snapshot.queryParams).length > 0) {
      this.filter();
    }
  }

  edit(user: UserDto) {
    this.router.navigateByUrl(`/panel/user/edit/${user.id}`);
  }

  delete(user: UserDto) {
    this.userService.deleteUser(user.id).subscribe(
      () => this.filter(),
      (error) => console.error(error),
    );
  }

  active(user: UserDto) {
    this.userService.active(user.id).subscribe(
      () => this.filter(),
      (error) => console.error(error),
    );
  }

  filter() {
    if (this.pagination) {
      this.pagination.navigateToFirstPage();
    }
    this.requestUser();
  }

  reset() {
    this.userForm.reset();
    this.filter();
  }

  requestUser(page: number  = 1) {
    const params = {
      ...this.userForm.value,
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
    this.userService.paginable(params).subscribe(
      response => this.userPaginable = response,
      error => alert(JSON.stringify(error)),
    );
  }

  private initUserForm() {
    this.userForm = new FormGroup({
      name: new FormControl(this.activatedRoute.snapshot.queryParams.name),
      surname: new FormControl(this.activatedRoute.snapshot.queryParams.surname),
      email: new FormControl(this.activatedRoute.snapshot.queryParams.email),
    })
  }
}
