import { Injectable, EventEmitter } from '@angular/core';
import { Work } from './Logbook/work-list/work.model';

@Injectable({
  providedIn: 'root'
})

export class LogbookService {
  constructor() { }

  refreshList = new EventEmitter<Work[]>();
  refreshWork = new EventEmitter<Work>();
  id: number = 6;

  works: Work[] = [
    new Work(1, "Planner", "13/10/2020", "Planner for your life"),
    new Work(2, "Course work", "20/10/2020", "Course work 2020 !!!"),
    new Work(3, "Finally work", "24/10/2020", "Finally work 2020 !!!")
  ];

  getAllWorks(): Work[] {
    return this.works.slice();
  }

  addNewWork(newWork: Work): void {
    newWork.id = this.id++;
    this.works.push(newWork);
    this.refreshList.emit(this.works.slice());
  }

  searchWork(title: string): Work {
    let work = this.works.find(x => x.title == title);
    console.log(work);
    return work;
  }
}
