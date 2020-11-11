import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blog-img',
  templateUrl: './blog-img.component.html',
  styleUrls: ['./blog-img.component.scss']
})
export class BlogImgComponent implements OnInit {

  constructor() { }

  @Input() image: string;

  ngOnInit() {
  }

}
