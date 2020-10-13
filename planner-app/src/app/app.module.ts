import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './Events/Events.component';
import { EventListComponent } from './Events/event-list/event-list.component';
import { EventItemComponent } from './Events/event-list/event-item/event-item.component';
import { TaskComponent } from './Task/Task.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskItemComponent } from './Task/task-list/task-item/task-item.component';
import { AddEventComponent } from "./Events/add-event/add-event.component";
import { HeaderAppComponent } from './header-app/header-app.component';
import { HomeAppComponent } from './home-app/home-app.component';
import { Page404Component } from './page404/page404.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './about/contact/contact.component';
import { InfoComponent } from './about/info/info.component';
import { TestComponent } from './test/test.component';
import { ShowMyEventsComponent } from './Events/show-my-events/show-my-events.component';
import { ShowMyItemComponent } from './Events/show-my-events/show-my-item/show-my-item.component';
import { DetailsEventComponent } from './Events/details-event/details-event.component';
import { DeletedEventListComponent } from './Events/deleted-event-list/deleted-event-list.component';
import { DeletedEventItemComponent } from './Events/deleted-event-list/deleted-event-item/deleted-event-item.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventListComponent,
    EventItemComponent,
    TaskComponent,
    TaskListComponent,
    TaskItemComponent,
    AddEventComponent,
    HeaderAppComponent,
    HomeAppComponent,
    Page404Component,
    AboutComponent,
    ContactComponent,
    InfoComponent,
    TestComponent,
    ShowMyEventsComponent,
    ShowMyItemComponent,
    DetailsEventComponent,
    DeletedEventListComponent,
    DeletedEventItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
