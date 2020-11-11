import { Component, OnInit } from '@angular/core';
import { RegisterCustomerModel } from 'src/app/models/RegisterCustomer.model';
import { RegisterEmployeeModel } from 'src/app/models/RegisterEmployee.model';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  owner = new RegisterCustomerModel();
  mainManager = new RegisterCustomerModel();
  employees: RegisterEmployeeModel[] = [];
  role: string;

  refreshList() {
    this.authService.GetAllEmployees().subscribe(
      (data) => {
        this.employees = data;
      }
    )
  }
  
  ngOnInit() {
    this.authService.GetOwner().subscribe(
      data => {
        this.owner = data
      }
    );
    this.authService.GetMainManager().subscribe(
      data => {
        this.mainManager = data
      }
    )

    this.refreshList();
    this.authService.refreshList.subscribe(
      data => {
        this.refreshList();
      }
    )

    this.authService.statusLogin.subscribe(
      (data) => {
        // this.isLoggedIn = this.authService.isLoggedIn();
        this.role = this.authService.isRole();
      }
    );
    // this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.isRole();
  }

}
