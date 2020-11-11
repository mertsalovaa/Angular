import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app.routing.mode';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { ListItemsComponent } from './manager-panel/list-items/list-items.component';
import { BeautyServicesComponent } from './beauty-services/beauty-services.component';
import { ListServicesComponent } from './beauty-services/list-services/list-services.component';
import { ItemServicesComponent } from './beauty-services/list-services/item-services/item-services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddServiceComponent } from './beauty-services/add-service/add-service.component';
import { EditServiceComponent } from './beauty-services/edit-service/edit-service.component';
import { BeautyProductsComponent } from './beauty-products/beauty-products.component';
import { ListProductsComponent } from './beauty-products/list-products/list-products.component';
import { ItemProductsComponent } from './beauty-products/list-products/item-products/item-products.component';
import { AddProductsComponent } from './beauty-products/add-products/add-products.component';
import { EditProductsComponent } from './beauty-products/edit-products/edit-products.component';
import { ManagementUsersComponent } from './management-users/management-users.component';
import { ListEmployeesComponent } from './management-users/list-employees/list-employees.component';
import { ItemEmployeeComponent } from './management-users/list-employees/item-employee/item-employee.component';
import { AddEmployeeComponent } from './management-users/add-employee/add-employee.component';
import { EditEmployeeComponent } from './management-users/edit-employee/edit-employee.component';
import { ListServiceComponent } from './employee-panel/list-service/list-service.component';
import { ItemServiceComponent } from './employee-panel/list-service/item-service/item-service.component';
import { BlogGalleryComponent } from './blog-gallery/blog-gallery.component';
import { BlogImgComponent } from './blog-gallery/blog-img/blog-img.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { ItemInfoComponent } from './beauty-products/list-products/item-info/item-info.component';
import { ItemInfoSComponent } from './beauty-services/list-services/item-infoS/item-infoS.component';
import { AnimationGalleryComponent } from './animation-gallery/animation-gallery.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartItemSComponent } from './cart/cart-itemS/cart-itemS.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { OrderedProductsComponent } from './beauty-products/ordered-products/ordered-products.component';
import { OrderedItemComponent } from './beauty-products/ordered-products/ordered-item/ordered-item.component';


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
    LoginComponent,
    RegisterComponent,
    ManagerPanelComponent,
    ListItemsComponent,
    EmployeePanelComponent,
    BeautyServicesComponent,
    ListServicesComponent,
    ItemServicesComponent,
    AddServiceComponent,
    EditServiceComponent,
    BeautyProductsComponent,
    ListProductsComponent,
    ItemProductsComponent,
    AddProductsComponent,
    EditProductsComponent,
    ManagementUsersComponent,
    ListEmployeesComponent,
    ItemEmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListServiceComponent,
    ItemServiceComponent,
    BlogGalleryComponent,
    BlogImgComponent,
    CustomerPanelComponent,
    ItemInfoComponent,
    ItemInfoSComponent,
    AnimationGalleryComponent,
    FooterComponent,
    CartComponent,
    CartItemComponent,
    CartItemSComponent,
    UserInfoComponent,
    OrderedProductsComponent,
    OrderedItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NotifierModule.withConfig(conf),
    BrowserAnimationsModule
  ],
  providers: [
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
