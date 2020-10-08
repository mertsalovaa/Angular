import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../Events.service';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  events: Event[];


  ngOnInit() {
    this.events = this.eventsService.getAllEvents();
    this.eventsService.refreshList.subscribe((newEvents: Event[]) => {
      this.events = newEvents;
    });
  }

}
