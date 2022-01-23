import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService, UserService } from './service';
import { StorageModule } from '../../service';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StorageModule,
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
})
export class ShelterEvaluationApiModule { }
