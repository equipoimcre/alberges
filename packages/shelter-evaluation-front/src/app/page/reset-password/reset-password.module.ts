import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'request',
    component: RequestPasswordComponent,
  },
  {
    path: 'reset/:token',
    component: ResetPasswordComponent,
  }
];

@NgModule({
  declarations: [
    RequestPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class ResetPasswordModule { }
