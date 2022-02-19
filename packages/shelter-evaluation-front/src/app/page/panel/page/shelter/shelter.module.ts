import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelterSearchComponent } from './components/shelter-search/shelter-search.component';
import { ShelterCreateComponent } from './components/shelter-create/shelter-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ShelterValidateComponent } from './components/shelter-validate/shelter-validate.component';
import { ShelterFormComponent } from './components/shelter-form/shelter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunityListResolver } from './resolver';

const routes: Routes = [
  {
    path: 'search',
    component: ShelterSearchComponent,
  },
  {
    path: 'create',
    component: ShelterCreateComponent,
    resolve: {
      communityList: CommunityListResolver
    }
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
    ShelterFormComponent,
  ],
  providers: [
    CommunityListResolver,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class ShelterModule {}
