import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterEmployeeModel } from 'src/app/models/RegisterEmployee.model';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  currentEmployee = new RegisterEmployeeModel();
  specialityType: string[] = [];
  speciality: string;

  edit() {
      this.service.EditEmployee(this.currentEmployee).subscribe(
        data => {
          if (data.status == 200) {
            this.service.refreshList.emit(true);
            this.router.navigate(["manager-panel/management-users"])
          }
        }
      );
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

    this.service.GetEmployeeById(this.service.id).subscribe(
      data => {
        console.log(data);
        this.currentEmployee = data;
      }
    )
  }


}
