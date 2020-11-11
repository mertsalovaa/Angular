import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response.model';
import { BeautyProductModel } from '../models/BeautyProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient,
    private router: Router) { }

  baseUrl = "/api/Product";

  refreshList = new EventEmitter<boolean>();
  id: number;
  infoProduct = new BeautyProductModel();

  getAllProducts(): Observable<BeautyProductModel[]> {
    return this.http.get<BeautyProductModel[]>(this.baseUrl + "/all");
  }

  addProduct(model: BeautyProductModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/add", model);
  }

  getProductTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/types");
  }

  deleteProduct(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/delete?id=" + id);
  }

  editProduct(model: BeautyProductModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/update", model);
  }

  getProductById(id: number): Observable<BeautyProductModel> {
    return this.http.get<BeautyProductModel>(this.baseUrl + "/get-by-id?id=" + id);
  }

  getProductByName(name: string) : Observable<BeautyProductModel> {
    return this.http.get<BeautyProductModel>(this.baseUrl + "/get-by-name?name=" + name);
  }
}