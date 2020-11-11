import { Component, Input, OnInit } from '@angular/core';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { OrderBeautyProduct } from 'src/app/models/OrderBeautyProduct.model';

@Component({
  selector: 'ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.scss']
})
export class OrderedItemComponent implements OnInit {

  constructor() { }

  @Input() currentOrderedProduct: OrderBeautyProduct;

  ngOnInit() {
  }

}
