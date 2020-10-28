import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response.model';
import { SignInModel } from '../Models/sign-in.model';
import { SignUpModel } from '../Models/sign-up.model';
import jwt_decode from "jwt-decode"
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router) { }

  baseUrl = "/api/Account";

  statusLogin = new EventEmitter<boolean>()

  SignUp(model: SignUpModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register', model);
  }

  SignIn(model: SignInModel): Observable<ApiResponse> {
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

  isAdmin() {
    if (this.isLoggedIn()) {
      var token = localStorage.getItem('token');
      var dataToken = jwt_decode(token)
      if (dataToken.roles === "Admin") {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  LogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.statusLogin.emit(false);
  }

}
