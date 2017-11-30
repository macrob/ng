import { Component, OnInit, Input } from '@angular/core';

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
  request: BTCrequest;
  wait: number = 30;
  counter: number = 30;
  constructor(private testService: TestService) { }

  runTimer() {
    let interval = setInterval(() => { this.counter--; 
    
    if(this.counter === 0) {
      this.timeout();
    }
    }, 1000);
  }

timeout() {
alert('timeout');
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
