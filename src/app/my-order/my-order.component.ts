import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShippingInfo } from '../common/shippingInfo';
import { AuthenticationService } from '../auth-service/authentication.service';
import { AppUser } from '../common/app-user';
import { DataService } from '../common/data.service';
import { ProductVO } from '../common/product';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  shippingDetail: ShippingInfo[] = [];
  appData: AppUser;
  isAdmin: boolean = false;
  shippedItems: ProductVO[];
  constructor(private shopService: ShoppingCartService,
    private authService: AuthenticationService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.items.subscribe(item =>{
      this.shippedItems = item;
      console.log('shippedItems' + item);
    })
    this.authService.getAppUser(this.authService.getUserName()).subscribe(data => {
      this.appData = data;
      if (data.role === "1") this.isAdmin = true;
    });
    this.shopService.getAllDetail().subscribe(detail => {

      detail.forEach(data => {
        if (this.isAdmin) {
          this.shippingDetail = detail;
        } else {
          if(data.userName === this.appData.userName) {
            this.shippingDetail.push(data);
          }  
        }
      });

    });
  }

}
