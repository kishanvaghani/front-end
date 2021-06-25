import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  state: boolean = true;
  active: boolean = false;
  btn: boolean = false;
  valid: boolean = true;
  ipAddress: any = [];
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {}

  @Output() show = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
    });
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      // this.active = true;
      this.spinner.show();
      this.auth
        .loginUser(this.loginForm.value)
        .pipe(delay(3000))
        .subscribe(
          (res) => {
            console.log('res', res);
            const redirect = this.auth.redirectUrl
              ? this.auth.redirectUrl
              : '/dashboard';
            this.router.navigate([redirect]);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            alert('User name or password is incorrect');
          }
        );
    }
  }
}
