import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  UserCreateComponent,
  UserEditComponent,
  UserListComponent,
  UserFormComponent,
} from './components';
import { ShelterEvaluationApiModule } from '../../../../package';
import { UserListResolver } from './resolver/user-list.resolver';
import { UserResolver } from './resolver/user.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { ProvinceListResolver } from './resolver/province-list.resolver';
import { OrganizationListResolver } from './resolver/organization-list.resolver';
import { RoleListResolver } from './resolver/role-list.resolver';
import { PositionListResolver } from './resolver/position-list.resolver';
import { PaginationModule } from '../../../../components';

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
    },
  },
  {
    path: 'create',
    component: UserCreateComponent,
    resolve: {
      provinceList: ProvinceListResolver,
      organizationList: OrganizationListResolver,
      roleList: RoleListResolver,
      positionList: PositionListResolver,
    },
  },
  {
    path: 'edit/:id',
    component: UserEditComponent,
    resolve: {
      user: UserResolver,
      provinceList: ProvinceListResolver,
      organizationList: OrganizationListResolver,
      roleList: RoleListResolver,
      positionList: PositionListResolver,
    },
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
    ReactiveFormsModule,
    PaginationModule,
  ],
})
export class UserModule {}
