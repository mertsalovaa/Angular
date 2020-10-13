import { Component, OnInit } from '@angular/core';
import { EventsService } from '../Events.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  newTitle: string;
  newDescription: string;
  newImage: string;
  newDate: string;
id: number = 10;
  sendNewEvent() {
    const event = new Event(
      this.id,
      this.newTitle,
      this.newDescription,
      this.newDate,
      this.newImage
    )
    this.eventService.addNewEvent(event);
  }

  ngOnInit() {
    this.eventService.editEvent.subscribe((data:Event)=>{
      this.newTitle = data.title;
      this.newDescription = data.desription;
      this.newDate = data.dateStart;
      this.newImage = data.image_url;
    })
  }

}
