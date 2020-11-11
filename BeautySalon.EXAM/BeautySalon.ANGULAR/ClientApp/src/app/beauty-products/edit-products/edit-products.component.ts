import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {

  constructor(
    private service: ProductService,
    private router: Router
  ) { }

  productType: string[] = [];
  employee: string[] = [];
  currentId: number;
  currentProduct = new BeautyProductModel();

edit() {
  document.querySelectorAll(".productType").forEach((item) => {
    // if (item.selected) {
    //   this.currentProduct.productType = item.innerHTML;
    // }
  });
    console.log(this.currentProduct);
    this.service.editProduct(this.currentProduct).subscribe(
      data => {
        if (data.status == 200) {
          this.service.refreshList.emit(true);
        }
      }
    );
    this.router.navigate(['manager-panel/beauty-services']);
}

  ngOnInit() {
    this.currentId = this.service.id;
    this.service.getProductById(this.currentId).subscribe(
      data => {
        this.currentProduct.id = data.id;
        this.currentProduct.name = data.name;
        this.currentProduct.price = data.price;
        this.currentProduct.image = data.image;
        this.currentProduct.description = data.description;
        this.currentProduct.productType = data.productType;
      }
    )
    
    const result: string[] = [];
    this.service.getProductTypes().subscribe(
      data => {
        data.forEach((item) => {
          result.push(item);
        });
      }
    );
    this.productType = result;
  }

}
