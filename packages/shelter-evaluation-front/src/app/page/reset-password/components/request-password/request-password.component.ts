import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService.requestResetPassword(this.resetPasswordForm.value.email).subscribe(
        () => alert($localize `:request.password.alert.success:Email was sent to your mailbox`),
        () => alert($localize `:request.password.alert.error:Couldn't send email retry again later`),
      );
    }
  }

  private initForm()  {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

}
