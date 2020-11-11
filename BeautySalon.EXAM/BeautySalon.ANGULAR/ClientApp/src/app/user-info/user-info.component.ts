import { Component, OnInit } from '@angular/core';
import { RegisterCustomerModel } from '../models/RegisterCustomer.model';
import { AuthService } from '../services/AuthService.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  user = new RegisterCustomerModel();

  ngOnInit() {
    let email = localStorage.getItem("currentUserEmail");
    if (email != null) {
      this.authService.GetUserByEmail(email).subscribe(
        data => {
          this.user = data;
        }
      );
    }
  }

}
