import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TestService, Test } from '../test.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  reg = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });


  constructor(private testService: TestService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.reg.status === 'VALID') {
      this.testService.post('/usr', this.reg.value).toPromise().then((res: any) => {
        console.log(res);

      });

      this.onSuccess.emit(this.reg.value);
    }
  }
}
