import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  redirectTo(path: string) {
    console.log(event.target);
    console.log(path);
    if (path === "Beauty services") {
      this.router.navigate(['manager-panel/beauty-services']);
    }
    if (path === "Beauty products") {
      this.router.navigate(['manager-panel/beauty-products']);
    }
    if (path === "Management user") {
      this.router.navigate(['manager-panel/management-users']);
    }
  }
  ngOnInit() {
  }

}
