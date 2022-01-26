import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDto, ProvinceDto, UserDto, UserPositionDto, UserRoleDto } from 'shelter-evaluation-dto';
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
  ) {}

  ngOnInit(): void {
    this.getDrataFromSnapshot();
    this.initialiceUserForm();
  }

  submitUser() {
    if (this.userForm.value.password === this.userForm.value.repeatPassword) {
      console.log(this.userForm.value);
    } else {
      console.error('Error')
    }
  }

  submitPassword() {
    if (this.userForm.value.password === this.userForm.value.repeatPassword) {
      console.log(this.userForm.value);
    } else {
      console.error('Error')
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
      province: new FormControl(this.user?.province, [Validators.required]),
      organization: new FormControl(this.user?.organization, [Validators.required]),
      role: new FormControl(this.user?.role, [Validators.required]),
      position: new FormControl(this.user?.position, [Validators.required]),
    }

    if (!this.user) {
      formGroup.password = new FormControl('', [Validators.required]);
      formGroup.repeatPassword = new FormControl('', [Validators.required]);
      formGroup.agreeTerm = new FormControl('', [Validators.required]);
    } else {
      this.passwordFrom = new FormGroup({
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
      })
    }

    this.userForm = new FormGroup(formGroup);
  }

}
