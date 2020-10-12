import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogbookComponent } from './Logbook/Logbook.component';
import { MystatComponent } from './Mystat/Mystat.component';
import { WorkListComponent } from './Logbook/work-list/work-list.component';
import { WorkItemComponent } from './Logbook/work-list/work-item/work-item.component';
import { AddWorkComponent } from './Logbook/add-work/add-work.component';
import { HomeComponent } from './Home/Home.component';
import { HeaderComponent } from './Header/Header.component';
import { WorkListStComponent } from './Mystat/work_list_st/work_list_st.component';
import { WorkItemStComponent } from './Mystat/work_list_st/work_item_st/work_item_st.component';


@NgModule({
  declarations: [						
    AppComponent,
      LogbookComponent,
      MystatComponent,
      WorkListComponent,
      WorkItemComponent,
      AddWorkComponent,
      HomeComponent,
      HeaderComponent,
      WorkListStComponent,
      WorkItemStComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
