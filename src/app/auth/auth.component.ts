import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  loginValid: boolean = false;
  diabledSignInButton: boolean = false;
  hide = true;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.required]],
      Password: ['', [Validators.required, Validators.min(3)]],
    });
  }
  get passwordInput() {
    return this.authForm.get('Password');
  }

  login() {
    if (this.authForm.valid) {
      this.diabledSignInButton = true;
      this._authService.logIn(this.authForm.value).subscribe({
        next: (data) => {
          let { auth } = data;
          this.loginValid = auth;
          if (auth) {
            this._router.navigate(['/pollsters'], {
              queryParams: { loggedin: 'success' },
            });
          } else {
            alert('Credenciales incorrectas, intente nuevamente!');
            this.authForm.reset();
          }
          this.diabledSignInButton = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
