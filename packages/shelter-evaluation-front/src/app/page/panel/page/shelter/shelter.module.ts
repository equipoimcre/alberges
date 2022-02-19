import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelterSearchComponent } from './components/shelter-search/shelter-search.component';
import { ShelterCreateComponent } from './components/shelter-create/shelter-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ShelterValidateComponent } from './components/shelter-validate/shelter-validate.component';

const routes: Routes = [
  {
    path: 'search',
    component: ShelterSearchComponent,
  },
  {
    path: 'create',
    component: ShelterCreateComponent,
  },
  {
    path: 'validate/:id',
    component: ShelterValidateComponent,
  },
];

@NgModule({
  declarations: [
    ShelterSearchComponent,
    ShelterCreateComponent,
    ShelterValidateComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ShelterModule {}
