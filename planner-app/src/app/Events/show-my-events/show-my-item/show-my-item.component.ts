import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../event.model';

@Component({
  selector: 'show-my-item',
  templateUrl: './show-my-item.component.html',
  styleUrls: ['./show-my-item.component.css']
})
export class ShowMyItemComponent implements OnInit {

  constructor() { }

  @Input() currentEvent: Event;
  @Input() index: number;

  ngOnInit() {
  }

}
