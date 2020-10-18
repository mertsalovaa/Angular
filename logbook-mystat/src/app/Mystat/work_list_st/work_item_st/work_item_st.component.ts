import { Component, Input, OnInit } from '@angular/core';
import { LogbookService } from 'src/app/Logbook.service';
import { Work } from 'src/app/Logbook/work-list/work.model';

@Component({
  selector: 'work-item-st',
  templateUrl: './work_item_st.component.html',
  styleUrls: ['./work_item_st.component.css']
})
export class WorkItemStComponent implements OnInit {

  constructor(private service: LogbookService) { }
  @Input() currentWork: Work;
  @Input() index: number;
  isDone: boolean = false;

  setDoneWork() {
      this.isDone = !this.isDone;
      this.currentWork.isDone = this.isDone;

    if (this.currentWork.isDone) {
      document.querySelectorAll(".card").forEach(item => {
        if (item.getAttribute("id") == this.currentWork.title) {
          let work = this.service.searchWork(item.getAttribute("id"));
          item.classList.remove("bg-info");
          item.classList.toggle("bg-orange");
          work.isDone = this.currentWork.isDone;
        }
      });
    }
  }

  ngOnInit() {
  }

}
