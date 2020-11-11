import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { BeautyService } from 'src/app/services/BeautyService.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  constructor(
    private service: BeautyService,
    private router: Router
  ) { }

  serviceType: string[] = [];
  employee: string[] = [];
  currentId: number;
  currentService = new BeautyServiceModel();

edit() {
    this.service.editService(this.currentService).subscribe(
      data => {
        if (data.status == 200) {
          this.service.refreshList.emit(true);
        }
      }
    );
    this.router.navigate(['manager-panel/beauty-services']);
}

  ngOnInit() {
    this.currentId = this.service.id;
    this.service.getServiceById(this.currentId).subscribe(
      data => {
        this.currentService.id = data.id;
        this.currentService.name = data.name;
        this.currentService.price = data.price;
        this.currentService.date = data.date;
        this.currentService.image = data.image;
        this.currentService.employeeName = data.employeeName;
        this.currentService.serviceType = data.serviceType;
      }
    )
    
    const result: string[] = [];
    const result2: string[] = [];
    this.service.getServiceTypes().subscribe(
      data => {
        data.forEach((item) => {
          result.push(item);
        });
      }
    );
    this.serviceType = result;
    this.service.getEmployees().subscribe(
      data => {
        data.forEach((item) => {
          result2.push(item);
        });
      }
    );
    this.employee = result2;
    console.log(this.currentService);
  }
}
