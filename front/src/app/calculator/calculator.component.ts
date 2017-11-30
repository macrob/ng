import { Component, OnInit, EventEmitter, Output } from '@angular/core';


import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TestService, Test } from '../test.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  defaultCommission = 0.5;
  tickerBTC: any;


  calculator = new FormGroup({
    btc: new FormControl('', [Validators.required]),
    amount: new FormControl('')
  });

  // isError: boolean = true;

  constructor(private testService: TestService) { }

  ngOnInit() {

    this.testService.get('/api/btc').toPromise().then(res => {
      this.tickerBTC = res;
    });
// 
//     this.calculator.valueChanges.subscribe(data => {
// this.isError = this.calculator.invalid;
// });

  }


  getTicker() {
    return this.tickerBTC.USD.last;
  }

  getUSD() {
    this.calculator.controls.amount.setValue(this.calculator.controls.btc.value * this.getTicker() * this.defaultCommission);
  }

  onSubmit() {
    if (this.calculator.status === 'VALID') {
  console.log(this.calculator.value);
      this.onSuccess.emit(this.calculator.value);
    }
  }
}
