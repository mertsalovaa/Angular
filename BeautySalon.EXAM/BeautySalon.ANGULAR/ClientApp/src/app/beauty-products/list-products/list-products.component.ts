import { Component, OnInit } from '@angular/core';
import { BeautyProductModel } from 'src/app/models/BeautyProduct.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  constructor(
    private pService: ProductService,
    private authService: AuthService
    ) { }

  beautyProducts: BeautyProductModel[];
  role: string;

  refreshList() {
    this.pService.getAllProducts().subscribe(
      (data) => {
        this.beautyProducts = data;
      }
    )
  }
  
  ngOnInit() {
    this.refreshList();
    this.pService.refreshList.subscribe(
      data => {
        this.refreshList();
      }
    );

    this.authService.statusLogin.subscribe(
      (data) => {
        this.role = this.authService.isRole();
      }
    );
    this.role = this.authService.isRole();
  }

}
