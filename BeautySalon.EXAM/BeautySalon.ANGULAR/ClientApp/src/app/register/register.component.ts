import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterCustomerModel } from '../models/RegisterCustomer.model';
import { RegisterEmployeeModel } from '../models/RegisterEmployee.model';
import { AuthService } from '../services/AuthService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private authService: AuthService,
    private router: Router) { }

  model = new RegisterCustomerModel();
  confirmPassword: string;
  // speciality: string[];
  // spec: string;
  // role: string;

  register() {
    this.spinner.show();
    if (!this.model.isValid()) {
      this.spinner.hide();
      this.notifier.notify('error', 'Please, enter all fields');
    }
    else if (!this.model.isEmail()) {
      this.spinner.hide();
      this.notifier.notify('error', 'Please, enter correct email');
    }
    else if (this.model.password != this.confirmPassword) {
      this.spinner.hide();
      this.notifier.notify('error', 'Password don\'t match');
    }
    else {
      this.authService.RegisterCustomer(this.model).subscribe(
        data => {
          if (data.status === 200) {
            this.notifier.notify('success', 'You success registered in system!');
            this.router.navigate(['/login']);
          }
          else {
            for (var i = 0; i < data.errors.length; i++) {
              this.notifier.notify('error', data.errors[i])
            }
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      )

    }
  }

  ngOnInit() {

  }

}
