import { Component, OnInit } from '@angular/core';
import { BeautyService } from '../services/BeautyService.service';

@Component({
  selector: 'app-blog-gallery',
  templateUrl: './blog-gallery.component.html',
  styleUrls: ['./blog-gallery.component.scss']
})
export class BlogGalleryComponent implements OnInit {

  constructor(
    private service: BeautyService
  ) { }

  images: string[] = [];

  ngOnInit() {
    this.service.getImages().subscribe(
      data => {
        console.log(data);
        this.images = data;
      }
    )
  }

}
