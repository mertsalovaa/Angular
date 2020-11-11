import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  constructor(private service: ProductService,
    private router: Router) { }

  newProduct = new BeautyProductModel();
  productTypes: string[] = [];

  add() {
    this.service.addProduct(this.newProduct).subscribe(
      data => {
        if (data.status == 200) {
          this.service.refreshList.emit(true);
        }
      }
    );
    this.router.navigate(['manager-panel/beauty-products']);
  }

  ngOnInit() {
    const result: string[] = [];
    this.service.getProductTypes().subscribe(
      data => {
        data.forEach((item) => {
          result.push(item);
        });
      }
      );
      this.productTypes = result;
  }

}
