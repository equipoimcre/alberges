import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    
  }
];

@NgModule({
  declarations: [
    RequestPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResetPasswordModule { }
