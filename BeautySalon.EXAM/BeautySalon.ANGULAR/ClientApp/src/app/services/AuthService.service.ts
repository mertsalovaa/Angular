import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/Login.model';
import { ApiResponse } from '../Models/api.response.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { RegisterEmployeeModel } from '../models/RegisterEmployee.model';
import { RegisterCustomerModel } from '../models/RegisterCustomer.model';
import { BeautyServiceModel } from '../models/BeautyService.model';
import { OrderBeautyService } from '../models/OrderBeautyService.model';
import { Image } from '../models/Image.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router) { }

  baseUrl = "/api/User";

  statusLogin = new EventEmitter<boolean>();
  refreshList = new EventEmitter<boolean>();
  currentUser = new LoginModel();
  imageUrl = new EventEmitter<string>();
  id: string;
  refreshOrderList = new EventEmitter<boolean>();

  RegisterEmployee(model: RegisterEmployeeModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register-employee', model);
  }

  RegisterCustomer(model: RegisterCustomerModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register-customer', model);
  }

  Login(model: LoginModel): Observable<ApiResponse> {
    this.currentUser = model;
    return this.http.post<ApiResponse>(this.baseUrl + '/login', model);
  }

  isLoggedIn() {
    var token = localStorage.getItem('token');
    if (token != null) {
      return true;
    }
    else {
      return false;
    }
  }

  isRole(): string {
    if (this.isLoggedIn()) {
      var token = localStorage.getItem('token');
      var dataToken = jwt_decode(token);
      return dataToken.roles;
    }
  }

  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserEmail');
    this.router.navigate(['/']);
    this.statusLogin.emit(false);
  }

  GetSpecialty(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + "/speciality");
  }

  GetUserImage(email: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + "/get-user-image?email=" + email)
  }

  GetOwner(): Observable<RegisterCustomerModel> {
    return this.http.get<RegisterCustomerModel>(this.baseUrl + "/owner");
  }

  GetMainManager(): Observable<RegisterCustomerModel> {
    return this.http.get<RegisterCustomerModel>(this.baseUrl + "/main-manager");
  }

  GetAllEmployees(): Observable<RegisterEmployeeModel[]> {
    return this.http.get<RegisterEmployeeModel[]>(this.baseUrl + "/employees");
  }

  DeleteEmployee(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/delete-employee?id=" + id);
  }

  GetEmployeeById(id: string): Observable<RegisterEmployeeModel> {
    return this.http.get<RegisterEmployeeModel>(this.baseUrl + "/get-empl-by-id?id=" + id);
  }

  EditEmployee(model: RegisterEmployeeModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/edit-employee", model);
  }

  GetCustomerByEmail(email: string): Observable<RegisterCustomerModel> {
    return this.http.get<RegisterCustomerModel>(this.baseUrl + "/get-customer-by-email?email=" + email);
  }

  GetOrderServiceByEmplEmail(emplEmail: string): Observable<OrderBeautyService[]> {
    return this.http.get<OrderBeautyService[]>(this.baseUrl + "/get-order-service-by-empl-email?emplEmail=" + emplEmail);
  }
  GetUserByEmail(email: string): Observable<RegisterCustomerModel> {
    return this.http.get<RegisterCustomerModel>(this.baseUrl + "/get-user-by-email?email=" + email);
  }
  // !!!!! speciality selected
  //   <select *ngIf="role === 'Main manager'" class="form-control"  id="exampleFormControlSelect1">
  //   <option disabled>Specialities</option>
  //   <option class="input100 label-input100" *ngFor="let item of speciality;">{{item}}</option>
  // </select>

  // ts code speciality
  // let buffer = [];
  //     this.authService.GetSpecialty().subscribe(
  //       data => {
  //         data.forEach((item) => {
  //           let name = item;
  //           buffer.push(name);
  //         });
  //       }
  //     );
  //     this.speciality = buffer;

}
