import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterEmployeeModel } from 'src/app/models/RegisterEmployee.model';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss']
})
export class ItemEmployeeComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  @Input() currentEmployee: RegisterEmployeeModel;
  role: string;
  delete(id: string) {
    this.service.DeleteEmployee(id).subscribe(
      data => {
        console.log(data);
        this.service.refreshList.emit(true);
      }
    );
  }

  edit(id: string) {
    this.service.id = id;
    this.router.navigate(['manager-panel/management-users/edit']);
  }

  ngOnInit() {
    this.service.statusLogin.subscribe(
      (data) => {
        // this.isLoggedIn = this.authService.isLoggedIn();
        this.role = this.service.isRole();
      }
    );
    // this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.service.isRole();
  }

}
