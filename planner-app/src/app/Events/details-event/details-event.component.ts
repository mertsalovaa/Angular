import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Event } from '../event.model';
import { EventsService } from '../Events.service';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {

  constructor(private eventService: EventsService, private router: ActivatedRoute) { }
  currentEvent: Event;
  index: number;
  ngOnInit() {
this.router.params.subscribe((param: Params)=> {
  this.index = param["index"];
})
    this.currentEvent = this.eventService.getSelectEvent(this.index);
  }

}
