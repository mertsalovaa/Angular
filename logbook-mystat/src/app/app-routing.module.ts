import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { AddWorkComponent } from './Logbook/add-work/add-work.component';
import { LogbookComponent } from './Logbook/Logbook.component';
import { WorkListComponent } from './Logbook/work-list/work-list.component';
import { MystatComponent } from './Mystat/Mystat.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  { path: 'home', pathMatch: 'full', component: HomeComponent },
  
  {
    path: 'logbook', component: LogbookComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/logbook/works' },
      { path: 'add', pathMatch: 'full', component: AddWorkComponent },
      { path: 'works', pathMatch: 'full', component: WorkListComponent }
    ]
  },

  { path: 'mystat', pathMatch: 'full', component: MystatComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
