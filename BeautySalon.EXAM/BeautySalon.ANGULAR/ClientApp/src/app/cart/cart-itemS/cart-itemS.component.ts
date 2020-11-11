import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { OrderServiceModel } from 'src/app/models/OrderService.model';
import { BeautyService } from 'src/app/services/BeautyService.service';
import { OrderService } from 'src/app/services/OrderService.service';
import { OrderProductService } from 'src/app/services/OrderProduct.service';

@Component({
  selector: 'app-cart-itemS',
  templateUrl: './cart-itemS.component.html',
  styleUrls: ['./cart-itemS.component.scss']
})
export class CartItemSComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private notifier: NotifierService,
    private bService: BeautyService,
    private spinner: NgxSpinnerService,
    private orderProduct: OrderProductService
  ) { }

  @Input() currentOrder: OrderServiceModel;
  currentService = new BeautyServiceModel();
  allPrice: number = 0;

  delete(id: number, idS) {
    this.orderProduct.deleteFromCart.emit(true);

    this.spinner.show();
    this.bService.getServiceById(idS).subscribe(
      data => {
        this.orderService.deleteOrder(id).subscribe(
          data => {
            if (data.status == 200) {
              this.orderService.refreshList.emit(true);
              this.orderProduct.refreshList.emit(true);

              this.notifier.notify("success", "You delete service");
            }
          }
        )
      }
    )
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit() {
    this.allPrice = 0;
    this.bService.getServiceByName(this.currentOrder.serviceName).subscribe(
      data => {
        this.currentService = data;
        this.allPrice += this.currentService.price;
        this.orderService.allPrice.emit(this.allPrice);
      }
    )

  }

}
