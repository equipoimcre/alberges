import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthService,
  Communityervice,
  OrganizationService,
  PositionService,
  ProvinceService,
  QuestionService,
  RoleService,
  UserService,
} from './service';
import { StorageModule } from '../../service';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule, StorageModule],
  providers: [
    AuthService,
    UserService,
    ProvinceService,
    RoleService,
    OrganizationService,
    PositionService,
    Communityervice,
    QuestionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class ShelterEvaluationApiModule {}
