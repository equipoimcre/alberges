import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShelterEvaluationApiModule } from './package';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShelterEvaluationApiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
