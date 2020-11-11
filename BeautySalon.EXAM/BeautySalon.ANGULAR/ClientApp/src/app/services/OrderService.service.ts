import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response.model';
import { OrderServiceModel } from '../models/OrderService.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
    private router: Router) { }

  baseUrl = "/api/OrderService";
  refreshList = new EventEmitter<boolean>();
  allPrice = new EventEmitter<number>();

  addOrder(model: OrderServiceModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/add", model);
  }

  deleteOrder(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/delete?id=" + id);
  }

  getAllOrders(name: string): Observable<OrderServiceModel[]> {
    return this.http.get<OrderServiceModel[]>(this.baseUrl + "/all?name=" + name);
  }
}