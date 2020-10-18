import { Component, Input, OnInit } from '@angular/core';
import { LogbookService } from 'src/app/Logbook.service';
import { Work } from '../work.model';

@Component({
  selector: 'work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css']
})
export class WorkItemComponent implements OnInit {

  constructor(private service: LogbookService) { }
  @Input() currentWork: Work;
  @Input() index: number;
  isDone: boolean = false;

  setMark() {
    console.log(this.currentWork.title + ' -> ' + this.currentWork.isDone);
    this.isDone = !this.currentWork.isDone;
    this.currentWork.isDone = !this.currentWork.isDone;
    this.currentWork.isChecked = true;   
    
    document.querySelectorAll(".card").forEach(item => {
      if (item.getAttribute("id") == this.currentWork.title) {
        let work = this.service.searchWork(item.getAttribute("id"));
        item.classList.remove("bg-info");
        item.classList.toggle("bg-success");
      }
    });
  }

  ngOnInit() {
  }

}
