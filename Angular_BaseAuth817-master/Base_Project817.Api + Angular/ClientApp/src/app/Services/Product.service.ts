import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  baseUrl = "/api/Product"

  listOfProducts: Observable<Product[]>;
  delete: Product;

  getAllProducts(): Observable<Product[]> {
    this.listOfProducts = this.http.get<Product[]>(this.baseUrl);
    return this.listOfProducts;
  }

  addProduct(product: Product) {
    console.log(product);
    this.http.post(this.baseUrl, product);
  }

  deleteProduct(id: number) {
    console.log(id);
    let httpParams = new HttpParams().set('id', id.toString());
    console.log(httpParams);

    let options = { params: httpParams };
    console.log(options.params);
    // this.http.delete(this.baseUrl, options.params);
    this.http.delete(this.baseUrl + "?id=" + id);
    this.listOfProducts.subscribe(
      data => {
        data.forEach(item => {
          if (item.id == id) {
            console.log(item);
            this.delete = new Product(item.id, item.title, item.price, item.description, item.image);
            console.log(this.delete);
            return item;
          }
        });
      }
    )
    console.log(this.delete);
  }

}
