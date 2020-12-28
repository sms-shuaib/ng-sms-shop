import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import *  as firebase from 'firebase'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductFormComponent } from './admin/product-form/product-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryServiceService } from './service/category-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProducctQuantityComponent } from './producct-quantity/producct-quantity.component';
import { ShoppingCartService } from './service/shopping-cart.service';
import { DataService } from './common/data.service';
import { BasicAuthHtppInterceptorService } from './auth-service/basic-auth-interceptor.service';
import { AuthGaurdService } from './auth-service/auth-gaurd.service';
import { AdminAuthGuardService } from './auth-service/admin-auth-guard.service';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';



firebase.initializeApp(environment.firebase)
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    AdminProductComponent,
    AdminOrderComponent,
    MyOrderComponent,
    ShoppingCartComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProducctQuantityComponent,
    SignUpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DataTableModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent , canActivate: [AuthGaurdService] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGaurdService] },
      { path: 'check-out', component: CheckOutComponent , canActivate: [AuthGaurdService] },
      { path: 'order-success/:id', component: OrderSuccessComponent , canActivate: [AuthGaurdService] },
      { path: 'order-success', component: OrderSuccessComponent , canActivate: [AuthGaurdService] },
      { path: 'my-order', component: MyOrderComponent , canActivate: [AuthGaurdService] },
      { path: 'login', component: LoginComponent },
      { path: 'admin/product-form/new', component: ProductFormComponent ,canActivate: [AuthGaurdService] },
      { path: 'admin/product-form/:id', component: ProductFormComponent ,canActivate: [AuthGaurdService] },
      { path: 'admin/product', component: AdminProductComponent, canActivate: [AuthGaurdService,AdminAuthGuardService] },
      { path: 'admin/order', component: AdminOrderComponent , canActivate: [AuthGaurdService, AdminAuthGuardService]},
      { path: 'shopping-cart', component: ShoppingCartComponent ,canActivate: [AuthGaurdService] },
      { path: 'sign-up' , component:SignUpFormComponent} ,

    ])
  ],
  providers: [CategoryServiceService, ProductService, ShoppingCartService, DataService, AuthGaurdService ,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
