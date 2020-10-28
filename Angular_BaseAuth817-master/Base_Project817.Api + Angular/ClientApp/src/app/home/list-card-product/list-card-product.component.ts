import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/Product.service';

@Component({
  selector: 'list-card-product',
  templateUrl: './list-card-product.component.html',
  styleUrls: ['./list-card-product.component.css']
})
export class ListCardProductComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  products: Product[];

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
