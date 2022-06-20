import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelterSearchComponent } from './components/shelter-search/shelter-search.component';
import { ShelterCreateComponent } from './components/shelter-create/shelter-create.component';
import { RouterModule, Routes } from '@angular/router';
import { ShelterValidateComponent } from './components/shelter-validate/shelter-validate.component';
import { ShelterFormComponent } from './components/shelter-form/shelter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunityListResolver, QuestionListResolver, ShelterResolver } from './resolver';
import { PaginationModule } from '../../../../components';
import { RoleGuard } from '../../../../guard';
import { ROLE, YesNoPipe } from '../../../../common';
import { ShelterInfoComponent } from './components/shelter-info/shelter-info.component';
import { ShelterMapComponent } from './components/shelter-map/shelter-map.component';

const routes: Routes = [
  {
    path: 'search',
    component: ShelterSearchComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [ ROLE.ADMINISTRATOR, ROLE.EVALUATOR, ROLE.VALIDATOR ], 
    },
    resolve: {
      communityList: CommunityListResolver,
    }
  },
  {
    path: 'create',
    component: ShelterCreateComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [ ROLE.ADMINISTRATOR, ROLE.LOCALIZATOR, ], 
    },
    resolve: {
      communityList: CommunityListResolver,
      questionList: QuestionListResolver,
    },
  },
  {
    path: 'validate/:id',
    component: ShelterValidateComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [ ROLE.ADMINISTRATOR, ROLE.VALIDATOR, ], 
    },
    resolve: {
      shelter: ShelterResolver,
      questionList: QuestionListResolver,
    },
  },
  {
    path: 'info/:id',
    component: ShelterInfoComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [ ROLE.ADMINISTRATOR, ROLE.EVALUATOR, ], 
    },
    resolve: {
      shelter: ShelterResolver,
      questionList: QuestionListResolver,
    },
  },
];

@NgModule({
  declarations: [
    ShelterSearchComponent,
    ShelterCreateComponent,
    ShelterValidateComponent,
    ShelterFormComponent,
    ShelterInfoComponent,
    ShelterMapComponent,
    YesNoPipe, 
  ],
  providers: [CommunityListResolver, QuestionListResolver, ShelterResolver, RoleGuard],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, PaginationModule,],
})
export class ShelterModule {}
