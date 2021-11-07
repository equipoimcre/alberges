import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../package/shelter-evaluation-api/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginFormModule = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.loginFormModule.valid) {
      const loginDto = {} as any;
      loginDto.username = this.loginFormModule.value.username;
      loginDto.password = this.loginFormModule.value.password;
      this.authService.login(loginDto).subscribe(
        () => this.router.navigate(['panel']),
        error => console.error(error),
      )
    }
  }
}
