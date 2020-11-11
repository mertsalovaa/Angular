import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'item-products',
  templateUrl: './item-products.component.html',
  styleUrls: ['./item-products.component.scss']
})
export class ItemProductsComponent implements OnInit {

  constructor(
    private service: ProductService,
    private router: Router,
    private authService: AuthService
  ) { }

  @Input() currentBeautyProduct: BeautyProductModel;
  role: string;

  delete(id: number) {
    console.log(id);
    this.service.deleteProduct(id).subscribe(
      data => {
        console.log(data);
        this.service.refreshList.emit(true);
      }
    );
  }

  edit(id: number) {
    this.service.id = id;
    this.router.navigate(['manager-panel/beauty-products/edit']);
  }

  info(id: number) {
    this.service.getProductById(id).subscribe(
      data => {
        console.log(data);

        this.service.infoProduct.name =  data.name;
        this.service.infoProduct.id =  data.id;
        this.service.infoProduct.price =  data.price;
        this.service.infoProduct.productType =  data.productType;
        this.service.infoProduct.description =  data.description;
        this.service.infoProduct.image =  data.image;

        console.log(this.service.infoProduct);
      }
    )
    this.router.navigate(['customer-panel/beauty-products/info']);
  }

  ngOnInit() {
    this.authService.statusLogin.subscribe(
      (data) => {
        this.role = this.authService.isRole();
      }
    );
    this.role = this.authService.isRole();
  }

}
