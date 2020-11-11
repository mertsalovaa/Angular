import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddProductsComponent } from './beauty-products/add-products/add-products.component';
import { BeautyProductsComponent } from './beauty-products/beauty-products.component';
import { EditProductsComponent } from './beauty-products/edit-products/edit-products.component';
import { ItemInfoComponent } from './beauty-products/list-products/item-info/item-info.component';
import { ListProductsComponent } from './beauty-products/list-products/list-products.component';
import { OrderedProductsComponent } from './beauty-products/ordered-products/ordered-products.component';
import { AddServiceComponent } from './beauty-services/add-service/add-service.component';
import { BeautyServicesComponent } from './beauty-services/beauty-services.component';
import { EditServiceComponent } from './beauty-services/edit-service/edit-service.component';
import { ItemInfoSComponent } from './beauty-services/list-services/item-infoS/item-infoS.component';
import { ListServicesComponent } from './beauty-services/list-services/list-services.component';
import { BlogGalleryComponent } from './blog-gallery/blog-gallery.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { ListServiceComponent } from './employee-panel/list-service/list-service.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './management-users/add-employee/add-employee.component';
import { EditEmployeeComponent } from './management-users/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './management-users/list-employees/list-employees.component';
import { ManagementUsersComponent } from './management-users/management-users.component';
import { ListItemsComponent } from './manager-panel/list-items/list-items.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'manager-panel', component: ManagerPanelComponent,
        children: [
            { path: '', component: ListItemsComponent },
            {
                path: 'beauty-services', component: BeautyServicesComponent,
                children: [
                    { path: '', component: ListServicesComponent },
                    { path: 'add', component: AddServiceComponent },
                    { path: 'edit', component: EditServiceComponent }
                ]
            },
            {
                path: 'beauty-products', component: BeautyProductsComponent,
                children: [
                    { path: '', component: ListProductsComponent },
                    { path: 'add', component: AddProductsComponent },
                    { path: 'edit', component: EditProductsComponent },
                    { path: 'ordered', component: OrderedProductsComponent }
                ]
            },
            {
                path: 'management-users', component: ManagementUsersComponent,
                children: [
                    { path: '', component: ListEmployeesComponent },
                    { path: 'add', component: AddEmployeeComponent },
                    { path: 'edit', component: EditEmployeeComponent }
                ]
            }
        ]
    },
    {
        path: 'employee-panel', component: EmployeePanelComponent,
        children: [
            { path: '', component: ListServiceComponent }
        ]
    },
    { path: 'contact', component: ListEmployeesComponent },
    { path: 'gallery', component: BlogGalleryComponent },
    {
        path: 'customer-panel', component: CustomerPanelComponent,
        children: [
            { path: '', component: HomeComponent },
            {
                path: 'beauty-services', component: BeautyServicesComponent,
                children: [
                    { path: '', component: ListServicesComponent },
                    { path: 'info', component: ItemInfoSComponent }
                ]
            },
            {
                path: 'beauty-products', component: BeautyProductsComponent,
                children: [
                    { path: '', component: ListProductsComponent },
                    { path: 'info', component: ItemInfoComponent }
                ]
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }