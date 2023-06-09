import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['mmicherdakr@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}

  async login() {
    console.log('Login: ', this.form.value);
    const { data, error } = await this.auth.login(this.form.value);
    console.log('Login res: ', data);

    if (error) {
      //error
    } else {
      this.router.navigateByUrl('/app', { replaceUrl: true });
    }
  }

  async register() {
    console.log('Register: ', this.form.value);
    const { data, error } = await this.auth.createAccount(this.form.value);
    console.log('Register res: ', data);

    if (error) {
      //error
    } else {
      this.router.navigateByUrl('/app', { replaceUrl: true });
    }
  }
}
