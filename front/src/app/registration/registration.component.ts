import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TestService, Test } from '../test.service';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  form = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });


  constructor(private testService: TestService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.testService.post('/usr', this.form.value).toPromise().then((res: User) => {

        this.authService.auth(res);
      });

      this.onSuccess.emit(this.form.value);
    }
  }
}
