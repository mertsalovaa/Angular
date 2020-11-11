import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterEmployeeModel } from 'src/app/models/RegisterEmployee.model';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  newEmployee = new RegisterEmployeeModel();
  specialityType: string[] = [];
  speciality: string;

  add() {
      this.service.RegisterEmployee(this.newEmployee).subscribe(
        data => {
          if (data.status == 200) {
            this.service.refreshList.emit(true);
            this.router.navigate(["manager-panel/management-users"])
          }
        }
      );
  }

  forSpeciality() {
    console.log(this.newEmployee.specialities);
  }

  ngOnInit() {
    const result: string[] = [];
    this.service.GetSpecialty().subscribe(
      data => {
        data.forEach((item) => {
          result.push(item);
        });
      }
    );
    this.specialityType = result;
  }

}
