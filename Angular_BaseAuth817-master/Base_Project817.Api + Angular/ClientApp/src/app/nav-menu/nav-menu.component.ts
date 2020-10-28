import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/AuthService.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

constructor(private authService: AuthService) {
 
  
}

  isLogged: boolean = false;
  isAdmin: boolean = false;

  isExpanded = false;

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
    this.isAdmin = this.authService.isAdmin();
    this.isLogged = this.authService.isLoggedIn();

    this.authService.statusLogin.subscribe(
      (status) => {
        this.isLogged = status;
        this.isAdmin = this.authService.isAdmin();
      }
    )
  }
}
