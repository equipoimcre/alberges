import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'panel',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./page/panel/panel.module').then(m => m.PanelModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
