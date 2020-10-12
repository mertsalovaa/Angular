import { Component, Input, OnInit } from '@angular/core';
import { Work } from '../work.model';

@Component({
  selector: 'work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css']
})
export class WorkItemComponent implements OnInit {

  constructor() { }
  @Input() currentWork: Work;
  @Input() index: number;
  ngOnInit() {
  }

}
