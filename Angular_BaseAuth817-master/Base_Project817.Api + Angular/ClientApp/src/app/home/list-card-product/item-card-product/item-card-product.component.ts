import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'item-card-product',
  templateUrl: './item-card-product.component.html',
  styleUrls: ['./item-card-product.component.css']
})
export class ItemCardProductComponent implements OnInit {

  constructor() { }

  @Input() currentProd: Product;
  @Input() index: number;



  ngOnInit() {
  }

}
