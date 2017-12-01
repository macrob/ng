import { Injectable, EventEmitter } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

export interface User {
  id: number;
  password: string;
}

@Injectable()
export class AuthService {
  isLoggedIn = false;
  user: EventEmitter<User> = new EventEmitter();
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  auth(user: User): void {
    this.user.emit(user);

     localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}