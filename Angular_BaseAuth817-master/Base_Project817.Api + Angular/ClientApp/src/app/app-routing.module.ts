import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddProductComponent } from './Admin-area/add-product/add-product.component';
import { AdminAreaComponent } from './Admin-area/Admin-area.component';
import { ListProductComponent } from './Admin-area/list-product/list-product.component';
import { ClientAreaComponent } from './Client-area/Client-area.component';
import { AdminGuard } from './Guard/admin.guard';
import { LoggedInGuard } from './Guard/loggedIn.guard';
import { NotLoginGuard } from './Guard/notLogin.guard';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'sign-in', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignInComponent },
    { path: 'sign-up', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignUpComponent },
    {
        path: 'admin-panel',
        canActivate: [AdminGuard],
        component: AdminAreaComponent,
        children:
            [
                { path: '', component: ListProductComponent },
                { path: 'add-product', component: AddProductComponent }
            ]
    },
    { path: 'client-panel', canActivate: [LoggedInGuard], pathMatch: 'full', component: ClientAreaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }