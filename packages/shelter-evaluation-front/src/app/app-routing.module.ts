import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard';
import { AlreadyLoginGuard } from './guard/already-login.guard';

const routes: Routes = [  
  {
    path: 'login',
    canActivate: [AlreadyLoginGuard],
    loadChildren: () =>
      import('./page').then((m) => m.LoginModule),
  },
  {
    path: 'panel',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page').then((m) => m.PanelModule),
  },
  {
    path: 'password',
    canActivate: [AlreadyLoginGuard],
    loadChildren: () =>
      import('./page').then((m) => m.ResetPasswordModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
