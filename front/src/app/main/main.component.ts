import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService,  User } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Http Test',
      route: '/htto-test',
      icon: 'view_quilt',
    }, {
      title: 'landing',
      route: '/landing',
      icon: 'receipt',
    }, {
      title: 'Contacts',
      route: '/contacts',
      icon: 'people',
    },
  ];
user: User;
  constructor(private _router: Router, private authService: AuthService) {
    this.authService.user.subscribe((user: User) => {
this.user = user;
});

}

  logout(): void {
    this._router.navigate(['/login']);
  }
}
