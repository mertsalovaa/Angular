import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../event.model';

@Component({
  selector: 'deleted-event-item',
  templateUrl: './deleted-event-item.component.html',
  styleUrls: ['./deleted-event-item.component.css']
})
export class DeletedEventItemComponent implements OnInit {

  constructor() { }

  @Input() currentEvent: Event;
  @Input() index: number;

  ngOnInit() {
  }

}
