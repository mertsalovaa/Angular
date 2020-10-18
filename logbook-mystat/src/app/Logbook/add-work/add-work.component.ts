import { Component, Input, OnInit } from '@angular/core';
import { LogbookService } from 'src/app/Logbook.service';
import { LogbookComponent } from '../Logbook.component';
// import { threadId } from 'worker_threads';
import { Work } from '../work-list/work.model';

@Component({
  selector: 'add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {

  constructor(private service: LogbookService) { }

  id: number;
  title: string;
  dateFinish: string;
  text_work: string;

  sendNewWork() {
    this.id = 8
    const newWork = new Work(
      this.id++,
      this.title,
      this.dateFinish,
      this.text_work
    )
    this.service.addNewWork(newWork);
  }

  ngOnInit() {
  }

}
