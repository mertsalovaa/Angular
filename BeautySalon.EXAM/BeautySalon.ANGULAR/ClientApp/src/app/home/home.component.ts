import { Component, OnInit } from '@angular/core';
import { BeautyProductModel } from '../models/BeautyProduct.model';
import { BeautyServiceModel } from '../models/BeautyService.model';
import { BeautyService } from '../services/BeautyService.service';
import { ProductService } from '../services/ProductService.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private bService: BeautyService,
    private pService: ProductService
  ) { }

  beautyServices: BeautyServiceModel[] = [];
  beautyProducts: BeautyProductModel[] = [];

  ngOnInit() {
    const services: BeautyServiceModel[] = [];
    this.bService.getAllService().subscribe(
      data => {
        data.forEach((item) => {
          if (services.length != 2) {
            services.push(item);
          }
        })
      }
    );
    this.beautyServices = services;
    const products: BeautyProductModel[] = [];
    this.pService.getAllProducts().subscribe(
      data => {
        data.forEach((item) => {
          if (products.length != 2) {
            products.push(item);
          }
        })
      }
    );
    this.beautyProducts = products;
  }
}
