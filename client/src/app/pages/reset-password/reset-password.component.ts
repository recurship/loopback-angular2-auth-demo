import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http}  from '@angular/http';

import { LoopBackConfig } from '../../sdk';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  accessToken: string = '';

  constructor(private http: Http, private route: ActivatedRoute) {
    this.accessToken = this.route.snapshot.queryParams['token'];
    // TODO validate the token using API
    if(!this.accessToken) {
      alert('No token found.');
    }
   }

  ngOnInit() {
  }

  resetPassword(password, newPassword) {
    // TODO extend the AppUser service and put this there.
    this.http.post(
      `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/ApiUsers/reset-password?accessToken=${this.accessToken}`,
      {
        password: password.value
      })
      .subscribe((res) => {
        console.log('Rest complete', res);
      });
  }

}
