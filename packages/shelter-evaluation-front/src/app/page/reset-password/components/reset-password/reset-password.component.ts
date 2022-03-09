import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( queryParams => {
      this.token = queryParams.token;
      if (!this.token) {
        this.router.navigateByUrl('/login')
      }
      this.initForm();
    })
    
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.resetPasswordForm.value.password === this.resetPasswordForm.value.repeatPassword) {
      this.authService.resetPassword(this.resetPasswordForm.value.password, this.token).subscribe(
        () => {
          alert($localize `:reset.password.alert.success:Password changed`)
          this.router.navigateByUrl('/login')
        },
        () => alert($localize `:reset.password.alert.error:Error trying to update the password try it later`)
      );
    } else {
      alert($localize `:reset.password.alert.duplicate.password:Password have to be the same`)
    }
  }

  private initForm() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      repeatPassword: new FormControl(null, [Validators.required]),
    })
  }

}
