import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response.model';
import { BeautyServiceModel } from '../models/BeautyService.model';


@Injectable({
  providedIn: 'root'
})
export class BeautyService {

  constructor(private http: HttpClient,
    private router: Router) { }

  baseUrl = "/api/Service";

  refreshList = new EventEmitter<boolean>();
  infoService = new BeautyServiceModel();
  ID = new EventEmitter<number>();
  id: number;

  getAllService(): Observable<BeautyServiceModel[]> {
    return this.http.get<BeautyServiceModel[]>(this.baseUrl + "/all");
  }

  deleteService(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/delete?id=" + id);
  }

  getServiceTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/types");
  }

  getEmployees(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/employees");
  }

  addService(model: BeautyServiceModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/add", model);
  }

  editService(model: BeautyServiceModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/update", model);
  }

  getServiceById(id: number): Observable<BeautyServiceModel> {
    return this.http.get<BeautyServiceModel>(this.baseUrl + "/get-by-id?id=" + id);
  }

  getServiceByEmployeeEmail(email: string): Observable<BeautyServiceModel[]> {
    return this.http.get<BeautyServiceModel[]>(this.baseUrl + "/get-by-employeeEmail?email=" + email);
  }

  getImages(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/gallery");
  }

  getServiceByName(name: string) : Observable<BeautyServiceModel> {
    return this.http.get<BeautyServiceModel>(this.baseUrl + "/get-by-name?name=" + name);
  }
}
