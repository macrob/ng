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
  defaultCommission = 0.5;
  tickerBTC: any;

  calculator = new FormGroup({
    btc: new FormControl('', [Validators.required, ]),
    amount: new FormControl('')
  });

  constructor(private testService: TestService) { }

  ngOnInit() {

    this.testService.get('/api/btc').toPromise().then(res => {
      this.tickerBTC = res;
    });
  }


  getTicker() {
  return this.tickerBTC.USD.last;
  }

  getUSD() {
     this.calculator.controls.amount.setValue(this.calculator.controls.btc.value * this.getTicker() * this.defaultCommission);
  }

  onSubmit() {
    if (this.calculator.status === 'VALID') {
      console.log('next.step');
    }
  }
}
