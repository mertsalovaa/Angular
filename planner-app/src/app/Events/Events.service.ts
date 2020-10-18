import { Injectable, EventEmitter } from '@angular/core';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  refreshList = new EventEmitter<Event[]>();
  editEvent = new EventEmitter<Event>();
  refreshFoggyList = new EventEmitter<Event[]>();

  constructor() { }

  events: Event[] = [
    new Event(1, "Visit JS Event", "stjhedju", "20/10/2020", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTZlnjYe9C9Gx5RrnkIZ2y7BUsJptiSm8tyQ&usqp=CAU"),
    new Event(2, "Course Work ITSTEP", "....", "15/10/2020", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUSEhAVFRUVFRUVFRUVFRUVFRUVFRUXFxUVFRUYHSggGB0lHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0iICYzMDctLS0vLS0wLjUrNTUrLS03KystLi0vLS8tKy0tLS0tLS0tKy0tLS0tLystLS0tK//AABEIAI4BYwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQYDBAUHAgj/xABNEAABAwIDAwcHBgsHAwUAAAABAAIDBBEFEiEGEzEUIkFRU5LRBzJhcYGRoSNScpOxshYkMzRCVFViosHCF2OCo7PS0xV0tENzw+Hw/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAEDAgQFBv/EACwRAQACAgECAgoCAwAAAAAAAAABAgMRIQQxBRITFDJBUWFxgbHwkcEiM9H/2gAMAwEAAhEDEQA/AKByuTtX993inLJO1f33eKwoiWblkvav77vFOWSdq/vu8VhRBm5XL2r++7xTlknav77vFYUQZuWSdq/vu8U5XJ2r++7xWFEGblcnav77vFOWS9q/vu8VhUIM/LJO1f33eKcsk7V/fd4rCiDNyyTtX993inLJO1f33eKwogzcsl7V/fd4pyuXtX993isKIM3K5O1f33eKcsk7V/fd4rCiDNyuTtX993inK5O1f33eKwogzcsk7V/fd4pyyTtX993isKhBn5ZJ2r++7xTlknav77vFYFKDNyyTtX993inLJO1f33eKwKUGblknav77vFOWSdq/vu8VhRBm5ZJ2r++7xTlcnav77vFYUQZuWSdq/vu8U5ZJ2r++7xWFEGblknav77vFOVy9q/vu8VhUIM/LJe1f33eKcrk7V/fd4rCiDNyyTtX993inLJe1f33eKwKUGblknav77vFOWSdq/vu8VhRBm5ZJ2r++7xTlkvav77vFYVCDPyyTtX993inK5O1f33eKwogzcrk7V/fd4osKICIoQSiIgKFKBAUKVCCUREBERAUKUQEREBERAREQEREBERAREQFClEBERAREQQpREBQpUIClEQQpREEKUUIJREQEREBFClAREQERQglERARFCCUREBFClARY9629rgHqOiyICIiCFKIgIiIChSiAiIgIiICIvh7wOJAQfSlQ11xdSgJd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"),
    new Event(3, "Buy laptop", "....", "07/10/2020", "data:image/jpeg;base64,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"),
  ];

  myEvent: Event;
  id: number = 6;
  foggyEvents: Event[] = [
    new Event(4, "Visit Js event", "some desc", "30/10/2020", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTZlnjYe9C9Gx5RrnkIZ2y7BUsJptiSm8tyQ&usqp=CAU")
  ];

  getAllEvents(): Event[] {
    return this.events.slice();
  }

  getDeletedEvents(): Event[] {
    if (this.foggyEvents != null) {
      return this.foggyEvents.slice();
    }
  }

  addNewEvent(newEvent: Event): void {
    newEvent.id = this.id++;
    this.events.push(newEvent);
    this.refreshList.emit(this.events.slice());
  }

  editCurrentEvent(editEvent: Event, index: number): void {
    this.events[index].title = editEvent.title;
    this.events[index].desription = editEvent.desription;
    this.events[index].dateStart = editEvent.dateStart;
    this.events[index].image_url = editEvent.image_url;
  }

  getSelectEvent(index: number): Event {
    return this.events[index];
  }

  getSearchEvent(title: string): Event {
    this.myEvent = this.events.find(x => x.title == title);
    this.myEvent.visible = !this.myEvent.visible;
    if (this.myEvent.visible == true) {
      var item = this.events.find(x => x.title == this.myEvent.title);
      this.foggyEvents.push(item);
      this.refreshList.emit(this.events.slice());
      this.refreshFoggyList.emit(this.foggyEvents.slice());
    }
    console.log(this.myEvent);
    return this.myEvent;
  }

}
