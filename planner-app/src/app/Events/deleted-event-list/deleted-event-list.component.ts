import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../Events.service';

@Component({
  selector: 'deleted-event-list',
  templateUrl: './deleted-event-list.component.html',
  styleUrls: ['./deleted-event-list.component.css']
})
export class DeletedEventListComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  deletedEvents: Event[];

  ngOnInit() {
    this.deletedEvents = this.eventService.getDeletedEvents();
    this.eventService.refreshFoggyList.subscribe((newEvents: Event[]) => {
      this.deletedEvents = newEvents;
    });
  }

}
