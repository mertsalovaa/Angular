import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/Product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { }
  // validateForm: FormGroup;
  // model: Product;

  // submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
  //   for (const key in this.validateForm.controls) {
  //     this.validateForm.controls[key].markAsDirty();
  //     this.validateForm.controls[key].updateValueAndValidity();
  //   }
  //   console.log(value);
  // }
  newTitle: string;
  newPrice: string;
  newDescription: string;
  newImage: string;

  addProduct() {
    this.spinner.show();
    const newProduct = new Product(1000, this.newTitle, parseInt(this.newPrice), this.newDescription, this.newImage);
    console.log(newProduct);
    this.productService.addProduct(newProduct);
    // this.productService.addProduct(newProduct).subscribe(
    //   data => {
    //     this.spinner.hide();
    //   });
  }

  ngOnInit() {
  }

}
