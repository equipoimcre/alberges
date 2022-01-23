import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent, UserEditComponent, UserListComponent, UserFormComponent} from './components';
import { ShelterEvaluationApiModule } from '../../../../package';
import { UserListResolver } from './resolver/user-list.resolver';
import { UserResolver } from './resolver/user.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: UserListComponent,
    resolve: {
      userPaginable: UserListResolver,
    }
  },
  {
    path: 'create',
    component: UserCreateComponent,
  },
  {
    path: 'edit/:id',
    component: UserEditComponent,
    resolve: {
      user: UserResolver,
    }
  },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    ShelterEvaluationApiModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
