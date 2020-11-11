import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/Order.model';
import { OrderProductModel } from '../models/OrderProduct.model';
import { OrderServiceModel } from '../models/OrderService.model';
import { RegisterCustomerModel } from '../models/RegisterCustomer.model';
import { AuthService } from '../services/AuthService.service';
import { OrderProductService } from '../services/OrderProduct.service';
import { OrderService } from '../services/OrderService.service';

// function Hello() {
//  console.log("Hello");
// }

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private orderProduct: OrderProductService,
    private authService: AuthService,
    private router: Router
  ) { }

  ordersService: OrderServiceModel[] = [];
  ordersProduct: OrderProductModel[] = [];
  myUser = new RegisterCustomerModel();
  name: string;
  allPrice: number = 0;

  getAllServices(userName: string) {
    this.ordersService = [];
    this.orderService.getAllOrders(userName).subscribe(
      data => {
        data.forEach((item) => {
          this.ordersService.push(item);
        })
      })
  }

  submit() {
    // Hello();
    this.authService.refreshOrderList.emit(true);
  }

  getAllProducts(userName: string) {
    this.ordersProduct = [];
    this.orderProduct.getAllOrders(userName).subscribe(
      data2 => {
        data2.forEach((item) => {
          this.ordersProduct.push(item);
        })
      }
    )
  }

  ngOnInit() {
    this.allPrice = 0;
  
    let data = localStorage.getItem("currentUserEmail");
    this.authService.GetCustomerByEmail(data).subscribe(
      user => {
        this.getAllServices(user.fullName);
        this.getAllProducts(user.fullName);

        this.orderService.refreshList.subscribe(
          data => {
            this.getAllServices(user.fullName);
          })

        this.orderProduct.refreshList.subscribe(
          data => {
            this.getAllProducts(user.fullName);
          })
      })

      this.orderProduct.deleteFromCart.subscribe((data) => {
        this.allPrice = 0;
      })

    this.orderService.allPrice.subscribe(
      data => {
        console.log(data);
        this.allPrice += data;
      }
    )
    this.orderProduct.allPrice.subscribe(
      data => {
        console.log(data);
        this.allPrice += data;
      }
    )
  }
}