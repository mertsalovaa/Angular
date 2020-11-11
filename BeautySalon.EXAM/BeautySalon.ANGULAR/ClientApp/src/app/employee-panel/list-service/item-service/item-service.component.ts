import { Component, Input, OnInit } from '@angular/core';
import { BeautyServiceModel } from 'src/app/models/BeautyService.model';
import { OrderBeautyService } from 'src/app/models/OrderBeautyService.model';

@Component({
  selector: 'app-item-service',
  templateUrl: './item-service.component.html',
  styleUrls: ['./item-service.component.scss']
})
export class ItemServiceComponent implements OnInit {

  constructor() { }

  @Input() currentBeautyService: OrderBeautyService;

  ngOnInit() {
  }

}