import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TestService, Test } from '../test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  step = 1;

  qr = '';
  deposit: {
    btc: number
  };

  reginfo: {
    phone: number;
    email: string;
    password: string;
  };

    constructor(private testService: TestService) { }

ngOnInit() {

}

goToRegistration(data: any) {
  this.deposit = data;
  this.step++;
}

getQr(data: any) {
  this.step++;
  console.log(this);
  this.reginfo = data;

}
}
