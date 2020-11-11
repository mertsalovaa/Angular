import { Component, OnInit } from '@angular/core';
import { RegisterCustomerModel } from '../models/RegisterCustomer.model';
import { AuthService } from '../services/AuthService.service';
import { OrderService } from '../services/OrderService.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }
  isExpanded = false;
  role: string;
  isLoggedIn: boolean;
user = new RegisterCustomerModel();

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.LogOut();
  }

  ngOnInit() {
    this.authService.statusLogin.subscribe(
      (data) => {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.role = this.authService.isRole();
      }
    );
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.isRole();
    }
}
