import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/Login.model';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) { }

  model = new LoginModel();
  isCustomer: boolean = false;

  login() {
    this.spinner.show();
    if (!this.model.isValid()) {
      this.notifier.notify('error', 'Please, enter all fields');
    }
    else if (!this.model.isEmail()) {
      this.notifier.notify('error', 'Please, enter correct email');
    }
    else {
      this.authService.Login(this.model).subscribe(
        data => {
          if (data.status === 200) {
            localStorage.setItem('token', data.token);
            var decode = jwt_decode(data.token);

            localStorage.setItem('currentUserEmail', (this.model.Email));
            
            if(decode.roles === "Main manager") {
              this.router.navigate(['/manager-panel'])
            }
            if(decode.roles === "Employee") {
              this.router.navigate(['/employee-panel'])
            }
            if (decode.roles === "Customer") {
              this.router.navigate(['/customer-panel'])
            }
            this.authService.statusLogin.emit(true);
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
    // this.authService.statusLogin.subscribe(
    //   data => {
    //     if (data === "Customer") {
    //       this.isCustomer = true;
    //     }
    //     else {
    //       this.isCustomer = false;
    //     }
    //   }
    // )
  }

}
