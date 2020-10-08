import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  tasks: Task[] = [
    new Task(1, "go in Kyiv"),
    new Task(2, "study some new info"),
    new Task(3, "buy new mouse")
  ];


  ngOnInit() {
  }

}
