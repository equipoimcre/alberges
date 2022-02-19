import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ShelterEvaluationApiModule } from '../../package';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ShelterEvaluationApiModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
