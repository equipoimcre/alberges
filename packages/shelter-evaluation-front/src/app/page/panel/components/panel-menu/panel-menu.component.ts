import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleDto } from 'shelter-evaluation-dto';
import { ROLE } from '../../../../common';
import { AuthService } from '../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss'],
})
export class PanelMenuComponent implements OnInit {

  currentRole!: UserRoleDto;

  urlList = [
    {
      url: 'user',
      title: $localize `:@@menu.user:User`,
      roles: [ ROLE.ADMINISTRATOR ],
    },
    {
      url: 'shelter/search',
      title: $localize `:@@menu.search.shelter:Search shelter`,
      roles: [ ROLE.ADMINISTRATOR, ROLE.EVALUATOR, ROLE.VALIDATOR ],
    },
    {
      url: 'shelter/create',
      title: $localize `:@@menu.create.shelter:Create shelter`,
      roles: [ ROLE.ADMINISTRATOR, ROLE.LOCALIZATOR, ],
    },
  ];

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.currentRole = this.activatedRoute.snapshot.data.currentRole;
  }

  public logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('');
  }
}
