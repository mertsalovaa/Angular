import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { BeautyService } from 'src/app/services/BeautyService.service';

@Component({
  selector: 'item-services',
  templateUrl: './item-services.component.html',
  styleUrls: ['./item-services.component.scss']
})
export class ItemServicesComponent implements OnInit {

  constructor(
    private service: BeautyService,
    private router: Router,
    private authService: AuthService
  ) { }

  @Input() currentBeautyService: BeautyServiceModel;
  date: any;
  role: string;

  delete(id: number) {
    this.service.deleteService(id).subscribe(
      data => {
        this.service.refreshList.emit(true);
      }
    );
  }

  edit(id: number) {
    this.service.id = id;
    this.router.navigate(['manager-panel/beauty-services/edit']);
  }

  info(id: number) {
    this.service.getServiceById(id).subscribe(
      data => {
        this.service.infoService.name =  data.name;
        this.service.infoService.id =  data.id;
        this.service.infoService.price =  data.price;
        this.service.infoService.employeeName =  data.employeeName;
        this.service.infoService.serviceType =  data.serviceType;
        this.service.infoService.image =  data.image;
        this.service.infoService.date =  data.date;
      }
    )
   this.router.navigate(['customer-panel/beauty-services/info']);
  }

  ngOnInit() {
    this.authService.statusLogin.subscribe(
      (data) => {
        this.role = this.authService.isRole();
      }
    );
    this.role = this.authService.isRole();
  }

}
