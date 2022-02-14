import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrganizationDto, ProvinceDto, UserDto, UserPositionDto, UserRoleDto } from 'shelter-evaluation-dto';
import { UserService } from 'src/app/package/shelter-evaluation-api/service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  user: UserDto | null = null;

  provinceList: ProvinceDto[] = [];
  organizationList: OrganizationDto[] = [];
  roleList: UserRoleDto[] = [];
  positionList: UserPositionDto[] = [];

  userForm!: FormGroup;
  passwordFrom!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getDrataFromSnapshot();
    this.initialiceUserForm();
  }

  submitUser() {
    if (this.userForm.valid && this.userForm.value.password === this.userForm.value.repeatPassword) {
      const user = {
        ...this.userForm.value,
        organization: this.getOrganizationById(this.userForm.value.organization),
        province: this.getProvinceById(this.userForm.value.province),
        role: this.getRoleById(this.userForm.value.role),
        position: this.getPositionById(this.userForm.value.position),
      }
      if (!this.user) {
        this.userService.createUser(user).subscribe(
          () => this.router.navigate(['panel', 'user']),
          error => alert(error.message.join('\n')),
        );
      } else {
        this.userService.updateUser({
          ...this.user,
          ...user,
        }).subscribe(
          () => alert('Update user succeed'),
          error => alert(error.message.join('\n')),
        );
      }      
    } else {
      alert('Form is not valid');
    }
  }

  submitPassword() {
    if (this.user && this.passwordFrom.valid && this.passwordFrom.value.password === this.passwordFrom.value.repeatPassword) {
      this.userService.changePassword(this.user.id, this.passwordFrom.value.password).subscribe(
        () => alert('Change password succeed'),
        error => alert(error.message.join('\n')),
      );
    } else {
      alert('Form is not valid');
    }
  }

  private getDrataFromSnapshot() {
    this.provinceList = this.activatedRoute.snapshot.data.provinceList;
    this.organizationList = this.activatedRoute.snapshot.data.organizationList;
    this.roleList = this.activatedRoute.snapshot.data.roleList;
    this.positionList = this.activatedRoute.snapshot.data.positionList;
  }

  private initialiceUserForm() {
    const formGroup: {[key: string]: AbstractControl} = {
      name: new FormControl(this.user?.name, [Validators.required]),
      surname: new FormControl(this.user?.surname, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      province: new FormControl(this.user?.province.id, [Validators.required]),
      organization: new FormControl(this.user?.organization.id, [Validators.required]),
      role: new FormControl(this.user?.role.id, [Validators.required]),
      position: new FormControl(this.user?.position.id, [Validators.required]),
    }

    if (!this.user) {
      formGroup.password = new FormControl(null, [Validators.required]);
      formGroup.repeatPassword = new FormControl(null, [Validators.required]);
      formGroup.agreeTerm = new FormControl(null, [Validators.required]);
    } else {
      this.passwordFrom = new FormGroup({
        password: new FormControl(null, [Validators.required]),
        repeatPassword: new FormControl(null, [Validators.required]),
      })
    }

    this.userForm = new FormGroup(formGroup);
  }

  private getOrganizationById(id: string) {
    return this.organizationList.find( element => element.id === parseInt(id));
  }
  
  private getPositionById(id: string) {
    return this.positionList.find( element => element.id === parseInt(id));
  }

  private getRoleById(id: string) {
    return this.roleList.find( element => element.id === parseInt(id));
  }
  private getProvinceById(id: string) {
    return this.provinceList.find( element => element.id === parseInt(id));
  }

}
