import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminAreaComponent } from './Admin-area/Admin-area.component';
import { ClientAreaComponent } from './Client-area/Client-area.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DemoNgZorroAntdModule } from './ng-zorro.module';
import { NzCardModule } from 'ng-zorro-antd/card'

// icons
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ListProductComponent } from './Admin-area/list-product/list-product.component';
import { AddProductComponent } from './Admin-area/add-product/add-product.component';
import { TokenInterceptor } from './interceptor';
import { ListCardProductComponent } from './home/list-card-product/list-card-product.component';
import { ItemCardProductComponent } from './home/list-card-product/item-card-product/item-card-product.component';



const antDesignIcons = AllIcons as {

  [key: string]: IconDefinition;

};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

const conf: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right'
    },
    vertical: {
      position: 'top'
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    AdminAreaComponent,
    ClientAreaComponent,
    ListProductComponent,
    AddProductComponent,
    ListCardProductComponent,
    ItemCardProductComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NotifierModule.withConfig(conf),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DemoNgZorroAntdModule,
    NzCardModule
  ],
  providers: [
    NgxSpinnerService,
    { provide: NZ_ICONS, useValue: icons },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
