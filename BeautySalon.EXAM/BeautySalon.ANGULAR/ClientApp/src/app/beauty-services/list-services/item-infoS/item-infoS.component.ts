import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { OrderServiceModel } from 'src/app/models/OrderService.model';
import { RegisterCustomerModel } from 'src/app/models/RegisterCustomer.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { BeautyService } from 'src/app/services/BeautyService.service';
import { OrderService } from 'src/app/services/OrderService.service';

@Component({
  selector: 'app-item-infoS',
  templateUrl: './item-infoS.component.html',
  styleUrls: ['./item-infoS.component.scss']
})
export class ItemInfoSComponent implements OnInit {

  constructor(
    private bService: BeautyService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  rotate: boolean = false;
  service = new BeautyServiceModel();
  role: string;
  customer = new RegisterCustomerModel();
  newOrderService = new OrderServiceModel();
  serviceName: string;

  setOrder(id: number) {
    this.spinner.show();
    this.bService.getServiceById(id).subscribe(
      (data) => {
        this.serviceName = data.name;
        this.newOrderService.serviceName = this.serviceName;
        this.newOrderService.customerName = this.customer.fullName;
        this.orderService.addOrder(this.newOrderService).subscribe(
          res => {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            if (res.status == 200) {
              this.orderService.refreshList.emit(true);
              
              this.router.navigate(['customer-panel']);
            }            
          }
        )
      }
    )
  }

  ngOnInit() {
    this.service = this.bService.infoService;

    this.authService.statusLogin.subscribe(
      (data) => {
        this.role = this.authService.isRole();
      }
    );
    this.role = this.authService.isRole();

    let data = localStorage.getItem("currentUserEmail");
    this.authService.GetCustomerByEmail(data).subscribe(
      cust => {
        this.customer = cust;
      }
    );
  }

}
