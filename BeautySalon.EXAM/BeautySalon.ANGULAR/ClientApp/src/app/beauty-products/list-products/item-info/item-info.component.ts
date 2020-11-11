import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { OrderProductModel } from 'src/app/models/OrderProduct.model';
import { RegisterCustomerModel } from 'src/app/models/RegisterCustomer.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { OrderProductService } from 'src/app/services/OrderProduct.service';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {

  constructor(
    private service: ProductService,
    private authService: AuthService,
    private orderProduct: OrderProductService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  rotate: boolean = false;
  product = new BeautyProductModel();
  role: string;
  customer = new RegisterCustomerModel();
  newOrderService = new OrderProductModel();
  productName: string;

  setOrder(id: number) {
    this.spinner.show();
    this.service.getProductById(id).subscribe(
      (data) => {
        this.productName = data.name;
        this.newOrderService.productName = this.productName;
        this.newOrderService.customerName = this.customer.fullName;
        this.orderProduct.addOrder(this.newOrderService).subscribe(
          res => {
            if (res.status == 200) {
              this.orderProduct.refreshList.emit(true);
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
              this.router.navigate(['customer-panel']);
            }            
          }
        )
      }
    )
    // console.log(this.customer);
    // this.orderProduct.getAllOrders(this.customer.fullName).subscribe(
    //   orders => {
    //     console.log(orders);
    //   }
    // )
  }

  ngOnInit() {
    this.product = this.service.infoProduct;

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
