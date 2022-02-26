import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { PanelMenuComponent } from './components/panel-menu/panel-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleGuard } from '../../guard';
import { ROLE } from '../../common';
import { CurrentRoleResolver } from './resolver';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    resolve: {
      currentRole: CurrentRoleResolver,
    },
    children: [
      {
        path: 'user',
        canActivate: [RoleGuard],
        data: {
          roles: [ ROLE.ADMINISTRATOR ],
        },
        loadChildren: () =>
          import('./page/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'shelter',
        loadChildren: () =>
          import('./page/shelter/shelter.module').then((m) => m.ShelterModule),
      },
    ],
  },
];

@NgModule({
  declarations: [PanelComponent, PanelMenuComponent],
  providers: [RoleGuard, CurrentRoleResolver],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule,],
})
export class PanelModule {}
