import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FIREBASE_APP_NAME } from '@angular/fire';
import { ProductService } from '../service/product.service';
import { ProductsComponent } from '../products/products.component'
import { DataService } from '../common/data.service';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth-service/authentication.service';
import { Router } from '@angular/router';
import { AppUser } from '../common/app-user';
import { threadId } from 'worker_threads';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  // @ViewChild(ProductsComponent) product;
  user$ = new Observable<firebase.User>(); //used as aync pipe in html to unsubcribe becos of firebase
  logined;
  userName;
  appUser: AppUser;
  //user=firebase.auth().currentUser;
  shoppingCartItemCount: number;
  countSubscribe: Subscription;
  cartSubscribe: Subscription;
  value: number;
  constructor(private afAuth: AngularFireAuth,
    private productService: ProductService,
    private dataService: DataService,
    private authService: AuthenticationService,
    private router: Router,
    private shopService: ShoppingCartService) {
    // afAuth.authState.subscribe(user=> this.user = user);
    this.logined = this.authService.isUserLoggedIn();
    if (this.logined) {
      this.dataService.userData.subscribe(data=>  {
        this.appUser = data;
      });
    } 
  }

  ngOnInit() {
    this.dataService.data.subscribe(value => {
      if (value === 0) {
        this.shoppingCartItemCount = value;
      }
      if (Math.sign(value)) {
        this.shoppingCartItemCount += value;
      } else {
        this.shoppingCartItemCount -= value;
      }
    });
  this.shoppingCartItemCount = 0;
    this.productService.getAll().subscribe(product => {
      product.forEach(element => {
        this.shoppingCartItemCount = this.shoppingCartItemCount + element.quantityId;
      });
      this.dataService.totalCountItems(this.shoppingCartItemCount);
    });
    console.log(this.shoppingCartItemCount);
  }

  ngOnDestroy() {
    this.cartSubscribe.unsubscribe();
    this.countSubscribe.unsubscribe();
  }
  logout() {
    sessionStorage.removeItem('username');
    this.appUser = null;
    if(this.shoppingCartItemCount) {
      this.dataService.items.subscribe(data=>{
        data.forEach(product=>{
          product.quantityId = 0;
          this.productService.update(product.id,product).subscribe(data=> console.log(data));
        })
      })
    }
    this.dataService.changeData(0);
    this.router.navigate(['/login'])
  } 
}
