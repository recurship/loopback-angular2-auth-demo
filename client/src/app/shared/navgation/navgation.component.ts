import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navgation',
  templateUrl: './navgation.component.html',
  styleUrls: ['./navgation.component.css']
})
export class NavgationComponent implements OnInit {

  isLogin: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((route) => {
      console.log(route.url, route.url == '/login');
      this.isLogin = route.url == '/login'; 
    });
  }

  ngOnInit() {
  }

}
