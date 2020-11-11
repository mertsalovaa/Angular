import { Component, OnInit } from '@angular/core';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { OrderBeautyService } from 'src/app/models/OrderBeautyService.model';
import { AuthService } from 'src/app/services/AuthService.service';
import { BeautyService } from 'src/app/services/BeautyService.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss']
})
export class ListServiceComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  beautyService: OrderBeautyService[] = [];
  email: string;

  getAllOrderService() {
    this.beautyService = [];
    this.email = localStorage.getItem("currentUserEmail");
    console.log(this.email);
    this.authService.GetOrderServiceByEmplEmail(this.email).subscribe(
      data => {
        this.beautyService = data;
      }
    );
  }

  ngOnInit() {
    this.getAllOrderService();
    this.authService.refreshOrderList.subscribe(
      data => {
        this.getAllOrderService();
      }
    )
  }
}