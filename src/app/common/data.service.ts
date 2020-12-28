import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductService } from '../service/product.service';
import { ProductVO } from './product';
import { AppUser } from './app-user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   data = new BehaviorSubject(1);
   totalCart = new BehaviorSubject(0);
   userName = new BehaviorSubject("");
   items = new BehaviorSubject<ProductVO[]>([]);
   currentData = this.data.asObservable();
   shoppingCartItemCount: number; 
   userData = new BehaviorSubject<AppUser>(null);


  constructor(private productService: ProductService) { }

  changeData(value: number) {
    this.data.next(value);
  }

  totalCountItems(value: number) {
    console.log("TotalCout" + value);
    this.totalCart.next(value);
  }

  addItems(product: ProductVO) {
    this.items.next(this.items.getValue().concat(product));
  }

  setUserName(name: string) {
    this.userName.next(name);
  }

  setAppUser(appuser: AppUser) {
    this.userData.next(appuser);
  }

  // getTotalShoppingCount() {
  //   this.shoppingCartItemCount = 0;
  //   this.productService.getAll().subscribe(product => {
  //     product.forEach(element => {
  //       this.shoppingCartItemCount = this.shoppingCartItemCount + element.quantityId;
  //     });
  //   });
  //   return this.shoppingCartItemCount;
//  }
}
