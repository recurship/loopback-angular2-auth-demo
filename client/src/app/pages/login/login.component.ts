import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SDKToken, AppUserApi } from '../../sdk';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userApi: AppUserApi, 
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {}

  login(email, password) {
    this.userApi.login({ email: email.value, password: password.value })
    .subscribe((token: SDKToken) => {
      this.authService.setUser(token);
      this.router.navigate(['/']);
    }, err => {
      alert(err && err.message ? err.message : 'Login failed!');
      password.value = '';
    });
  }

}
