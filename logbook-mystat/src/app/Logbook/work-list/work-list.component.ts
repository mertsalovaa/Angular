import { Component, OnInit } from '@angular/core';
import { LogbookService } from 'src/app/Logbook.service';
import { Work } from './work.model';

@Component({
  selector: 'work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {

  constructor(private service: LogbookService) { }

  works: Work[];

  ngOnInit() {
    this.works = this.service.getAllWorks();
    this.service.refreshList.subscribe((newWorks: Work[]) => {
      this. works = newWorks;
    });
    console.log(this.works);
  }

}
