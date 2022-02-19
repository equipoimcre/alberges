import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/package/shelter-evaluation-api/service';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss'],
})
export class PanelMenuComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('');
  }
}
