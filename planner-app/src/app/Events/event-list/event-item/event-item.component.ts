import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../event.model';
import { EventsService } from '../../Events.service';

@Component({
  selector: 'event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  // title: string = "JS Event in Kiev";
  // image_url: string = "https://meline.lviv.ua/wp-content/uploads/2019/06/javascript-1231.png";
  // dateStart: string = "20/10/2020";

  // currentEvent = new Event("JS Event in Kiev", "...", "20/10/2020", "https://meline.lviv.ua/wp-content/uploads/2019/06/javascript-1231.png");

  @Input() currentEvent: Event;
  @Input() index: number;
  isPriority: boolean = false;
  isVisible: boolean = false;
  setVisible() {
    this.isVisible = !this.isVisible;
    document.querySelector(".card").classList.toggle("foggy");
    console.log(event);
  }
  setPriority() {
    this.isPriority = !this.isPriority;
  }

  selectEdit() {
    this.eventService.editEvent.emit(this.currentEvent);
  }
  ngOnInit() {
  }

}
