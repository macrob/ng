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


  form = new FormGroup({
    btc: new FormControl('', [Validators.required]),
    amount: new FormControl('')
  });

  // isError: boolean = true;

  constructor(private testService: TestService) { }

  
  ngOnInit() {

    // this.testService.get('/api/btc').toPromise().then(res => {
    //   this.tickerBTC = res;
    // });
  this.getTicker();


// 
//     this.form.valueChanges.subscribe(data => {
// this.isError = this.form.invalid;
// });

  }


  getTicker() {
    this.testService.get('/api/btc').toPromise().then(res => {
      this.tickerBTC = res;
      // this.getTicker();
    });
  }

  getUSD() {
    if (this.form.controls.btc.valid) {
      this.form.controls.amount.setValue(this.form.controls.btc.value * this.tickerBTC.USD.last * this.defaultCommission);
    }
  }

  onSubmit() {
    if (this.form.status === 'VALID') {

      this.onSuccess.emit(this.form.value);
    }
  }
}
