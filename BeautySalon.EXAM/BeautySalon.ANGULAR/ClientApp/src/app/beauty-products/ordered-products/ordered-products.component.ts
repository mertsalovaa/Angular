import { Component, OnInit } from '@angular/core';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { OrderBeautyProduct } from 'src/app/models/OrderBeautyProduct.model';
import { OrderProductService } from 'src/app/services/OrderProduct.service';

@Component({
  selector: 'app-ordered-products',
  templateUrl: './ordered-products.component.html',
  styleUrls: ['./ordered-products.component.scss']
})
export class OrderedProductsComponent implements OnInit {

  constructor(
    private pOrderService: OrderProductService
  ) { }

  orderedProducts: OrderBeautyProduct[] = [];

  ngOnInit() {
    this.pOrderService.getAllProductOrders().subscribe(
      data => {
        this.orderedProducts = data;
        console.log(this.orderedProducts);
      }
    )
  }

}
