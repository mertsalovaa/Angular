import { Component, OnInit } from '@angular/core';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { BeautyService } from 'src/app/services/BeautyService.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {

  constructor(
    private bService: BeautyService,
    private authService: AuthService
  ) { }

  beautyServices: BeautyServiceModel[];
  role: string;
  isLogged: boolean;

  refreshList() {
    this.bService.getAllService().subscribe(
      (data) => {
        this.beautyServices = data;
      }
    )
  }

  ngOnInit() {
    this.refreshList();
    this.bService.refreshList.subscribe(
      data => {
        this.refreshList();
      }
    );

    this.authService.statusLogin.subscribe(
      (data) => {
        this.role = this.authService.isRole();
        this.isLogged = this.authService.isLoggedIn();
      }
    );
    this.isLogged = this.authService.isLoggedIn();
    this.role = this.authService.isRole();
  }

}
