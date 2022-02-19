import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'shelter-evaluation-dto';
import { UserService } from '../../../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public userList: UserDto[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userList = this.activateRoute.snapshot.data.userPaginable.data;
  }

  edit(user: UserDto) {
    this.router.navigateByUrl(`/panel/user/edit/${user.id}`);
  }

  delete(user: UserDto) {
    //TODO: Add push up notification
    this.userService.deleteUser(user.id).subscribe(
      (response) => {
        const index = this.userList.findIndex(
          (userAux) => userAux.id === user.id,
        );
        this.userList.splice(index, 1);
        console.log(response);
      },
      (error) => console.error(error),
    );
  }
}
