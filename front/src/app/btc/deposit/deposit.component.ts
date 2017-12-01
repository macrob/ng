import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { TestService, Test } from '../../test.service';

type BTCrequest = {
  URI: string;
  address: string;
  amount: number;
};

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  @Input() btc: any;
  @Output() onTimeout: EventEmitter<any> = new EventEmitter();

  request: BTCrequest;
  wait = 30;
  counter = 30;
  constructor(private testService: TestService) { }

  runTimer() {
    const interval = setInterval(() => {
    this.counter--;

      if (this.counter === 0) {
        this.timeout();
      }
    }, 1000);
  }

  timeout() {
    this.onTimeout.emit(this.request);
  }

  ngOnInit() {

    this.testService.post('/api/btc/getaddress', {
      amount: this.btc
    }).toPromise().then((res: BTCrequest) => {
      this.request = res;
      this.runTimer();

    });
  }

}
