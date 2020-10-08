import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './about/contact/contact.component';
import { InfoComponent } from './about/info/info.component';
import { DetailsEventComponent } from './Events/details-event/details-event.component';
import { EventsComponent } from './Events/Events.component';
import { ShowMyEventsComponent } from './Events/show-my-events/show-my-events.component';
import { HomeAppComponent } from './home-app/home-app.component';
import { Page404Component } from './page404/page404.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: '/home' },

  { path: 'events', pathMatch: 'full', component: EventsComponent },

  { path: 'home', pathMatch: 'full', component: HomeAppComponent },

  {
    path: 'about',
    component: AboutComponent,
    children: [
      { path: "", pathMatch: 'full', component: InfoComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'info', component: InfoComponent },
      { path: ':id', component: TestComponent }
    ]
  },

  { path: 'show-all-my-events', pathMatch: 'full', component: ShowMyEventsComponent },
 
  { path: 'details/:index', component: DetailsEventComponent },


  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
