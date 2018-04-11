import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

//https://angularfirebase.com/lessons/angular-firebase-authentication-tutorial-email-password-signup/
@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  detailForm: FormGroup;

  userState;

  constructor(public fb: FormBuilder, public auth: AuthService) {}

  ngOnInit() {
    this.userState = this.auth.user.map(user => {
      if (user) {
        return user.catchPhrase ? 'complete' : 'incomplete';
      }
    });

    // First Step
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          //Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          //Validators.minLength(6),
          //Validators.maxLength(25)
        ]
      ],
      region: ['', []]
    });

    // Second Step
    this.detailForm = this.fb.group({
      catchPhrase: ['', [Validators.required]]
    });
  }

  // Using getters will make your code look pretty
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  get catchPhrase() {
    return this.detailForm.get('catchPhrase');
  }

  // Step 1
  login() {
    return this.auth.emailLogin(this.email.value, this.password.value);
  }



  // Step 2
  setCatchPhrase(user) {
    return this.auth.updateUser(user, { catchPhrase: this.catchPhrase.value });
  }
}
