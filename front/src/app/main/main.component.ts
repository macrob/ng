import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qs-main',
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

  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['/login']);
  }
}
