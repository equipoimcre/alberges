import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service';

@NgModule({
  providers: [
    AuthService,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class ShelterEvaluationApiModule { }
