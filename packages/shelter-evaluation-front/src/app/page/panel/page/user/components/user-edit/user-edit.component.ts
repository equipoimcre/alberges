import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'shelter-evaluation-dto';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user: UserDto | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.activateRoute.snapshot.data.user;
  }

}
