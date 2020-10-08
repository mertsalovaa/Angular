import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../Events.service';

@Component({
  selector: 'show-my-events',
  templateUrl: './show-my-events.component.html',
  styleUrls: ['./show-my-events.component.css']
})
export class ShowMyEventsComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  events: Event[];
  
  ngOnInit() {
    this.events = this.eventsService.getAllEvents();
    this.eventsService.refreshList.subscribe((newEvents: Event[]) => {
      this.events = newEvents;
    });
  }

}
