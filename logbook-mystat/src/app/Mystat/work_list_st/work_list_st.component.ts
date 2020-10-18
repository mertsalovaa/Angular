import { Component, OnInit } from '@angular/core';
import { LogbookService } from 'src/app/Logbook.service';
import { Work } from 'src/app/Logbook/work-list/work.model';

@Component({
  selector: 'work-list-st',
  templateUrl: './work_list_st.component.html',
  styleUrls: ['./work_list_st.component.css']
})
export class WorkListStComponent implements OnInit {

  constructor(private service: LogbookService) { }

  works: Work[];

  ngOnInit() {
    this.works = this.service.getAllWorks();
    this.service.refreshList.subscribe((newWorks: Work[]) => {
      this.works = newWorks;
    });
  }
}