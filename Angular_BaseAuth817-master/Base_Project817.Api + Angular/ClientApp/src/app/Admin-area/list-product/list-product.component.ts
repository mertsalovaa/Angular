import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/Product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { }

  listOfData: Product[] = [];

  delete(id: number) {
    console.log(id);
    this.productService.deleteProduct(id);
  }

  ngOnInit() {
    this.spinner.show();
    this.productService.getAllProducts().subscribe(
      data => {
        this.listOfData = data;
        this.spinner.hide();
      }
    )
  }

}