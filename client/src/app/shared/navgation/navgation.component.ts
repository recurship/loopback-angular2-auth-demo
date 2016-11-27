import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppUserApi } from '../../sdk';

@Component({
  selector: 'app-navgation',
  templateUrl: './navgation.component.html',
  styleUrls: ['./navgation.component.css']
})
export class NavgationComponent implements OnInit {

  isLogin: boolean = false;

  constructor(
    private router: Router,
    private userApi: AppUserApi) {

    this.router.events.subscribe((route) => {
      this.isLogin = route.url.match('/login') !== null ||
        route.url.match('/reset') !== null;
    });
  }

  ngOnInit() {}

  logout() {
    this.userApi.logout().subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

}
