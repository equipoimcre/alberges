import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/';
import { RouterModule, Routes } from '@angular/router';
import { PanelMenuComponent } from './components/panel-menu/panel-menu.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./page/user/user.module').then(m => m.UserModule),
      },
    ]
  }  
];

@NgModule({
  declarations: [
    PanelComponent,
    PanelMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PanelModule { }
