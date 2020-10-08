import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  myId: number;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.myId = params["id"];
    })
  }

}
