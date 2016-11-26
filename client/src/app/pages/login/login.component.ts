import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SDKToken, UserApi } from '../../sdk';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountApi: UserApi, 
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {}

  login(email, password) {
    this.accountApi.login({ email: email.value, password: password.value })
    .subscribe((token: SDKToken) => {
      this.authService.setUser(token);
      this.router.navigate(['/']);
    }, err => {
      alert(err && err.message ? err.message : 'Login failed!');
      password.value = '';
    });
  }

}
