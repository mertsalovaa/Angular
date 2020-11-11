import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { never } from 'rxjs';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { BeautyService } from 'src/app/services/BeautyService.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  constructor(private service: BeautyService,
    private router: Router) { }

  serviceType: string[] = [];
  employee: string[] = [];
  newService = new BeautyServiceModel();

  add() {
    this.service.addService(this.newService).subscribe(
      data => {
        if (data.status == 200) {
          this.service.refreshList.emit(true);
        }
      }
    );
    this.router.navigate(['manager-panel/beauty-services']);
  }

  ngOnInit() {
    const result: string[] = [];
    this.service.getServiceTypes().subscribe(
      data => {
        data.forEach((item) => {
          result.push(item);
        });
      }
      );
      this.serviceType = result;
      const result2: string[] = [];
    this.service.getEmployees().subscribe(
      data => {
        data.forEach((item) => {
          result2.push(item);
        });
      }
    );
    this.employee = result2;
  }

}
