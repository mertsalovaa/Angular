import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { OrderModel } from 'src/app/models/Order.model';
import { OrderProductModel } from 'src/app/models/OrderProduct.model';
import { OrderProductService } from 'src/app/services/OrderProduct.service';
import { ProductService } from 'src/app/services/ProductService.service';
import { OrderService } from 'src/app/services/OrderService.service';

@Component({
  selector: 'app-cart-itemP',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(
    private orderProduct: OrderProductService,
    private notifier: NotifierService,
    private pService: ProductService,
    private spinner: NgxSpinnerService,
    private orderService: OrderService
  ) { }

  @Input() currentOrder: OrderProductModel;
  currentProduct = new BeautyProductModel();
  allPrice: number = 0;

  delete(id: number, idPr: number) {
    this.orderProduct.deleteFromCart.emit(true);
    this.spinner.show();
    this.pService.getProductById(idPr).subscribe(
      data => {
        this.orderProduct.deleteOrder(id).subscribe(
          data => {
            if (data.status == 200) {
              this.orderProduct.refreshList.emit(true);
              this.orderService.refreshList.emit(true);

              this.notifier.notify("success", "You delete product");
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
    this.pService.getProductByName(this.currentOrder.productName).subscribe(
      data => {
        this.currentProduct = data;
        this.allPrice += this.currentProduct.price;
        this.orderProduct.allPrice.emit(this.allPrice);
      }
    )

  }

}