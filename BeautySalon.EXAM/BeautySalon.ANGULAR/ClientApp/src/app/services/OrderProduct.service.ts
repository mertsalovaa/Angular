import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response.model';
import { BeautyProductModel } from '../models/BeautyProduct.model';
import { OrderBeautyProduct } from '../models/OrderBeautyProduct.model';
import { OrderProductModel } from '../models/OrderProduct.model';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  constructor(private http: HttpClient,
    private router: Router) { }

  baseUrl = "/api/OrderProduct";
  refreshList = new EventEmitter<boolean>();
  allPrice = new EventEmitter<number>();
  deleteFromCart = new EventEmitter<boolean>();

  addOrder(model: OrderProductModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/add", model);
  }

  deleteOrder(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/delete?id=" + id);
  }

  getAllOrders(name: string): Observable<OrderProductModel[]> {
    return this.http.get<OrderProductModel[]>(this.baseUrl + "/all?name=" + name);
  }

  getAllProductOrders() : Observable<OrderBeautyProduct[]> {
    return this.http.get<OrderBeautyProduct[]>(this.baseUrl + "/info-all");
  }
}
