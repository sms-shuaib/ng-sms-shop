import { Component, OnInit } from '@angular/core';
import { ShippingInfo } from '../common/shippingInfo';
import { DataService } from '../common/data.service';
import { ProductVO } from '../common/product';
import { ProductService } from '../service/product.service';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { AuthenticationService } from '../auth-service/authentication.service';
import { PurchasedProductInfo } from '../common/purchased-product-info';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  shipping: ShippingInfo;
  totalShoppingCart: number;
  shippingItems: ProductVO[];
  purchaseData: PurchasedProductInfo[]=[];
  totalPrice: number;
  aggregatePrice: number;
  userName;

  constructor(private dataService: DataService,
    private shopService: ShoppingCartService,
    private route: Router,
    private authService: AuthenticationService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.dataService.totalCart.subscribe(data=> {
      console.log(data);
      this.totalShoppingCart = data;
    });
    // this.dataService.items.subscribe(items=>{
    //   this.shippingItems = items;
    //   items.forEach(value=>{
    //     this.totalPrice = 0;
    //     this.aggregatePrice = value.price * value.quantityId;
    //     this.totalPrice += this.aggregatePrice;
    //   });
    // });
    this.shopService.getProductByQuantity().subscribe(items=>{
      this.shippingItems = items;
      console.log(items);
      this.totalPrice = 0;
      this.totalShoppingCart = 0;
      items.forEach(value=>{
        this.aggregatePrice = value.price * value.quantityId;
        this.totalPrice += this.aggregatePrice;
        this.totalShoppingCart += value.quantityId;
      });
    });


  }

  saveDetail(shipping: ShippingInfo) {
    shipping['userName'] = this.userName;
      this.shopService.saveShipDetail(shipping).subscribe(detail=>{
        this.savePurchasedProduct(this.shippingItems, detail);
        this.shippingItems =  this.shippingItems.map(data=>{
          data.quantityId = 0;
          return data;
        });
        this.shopService.updateProductList(this.shippingItems).subscribe(data=> console.log(data));
        this.dataService.changeData(0);
        this.route.navigate(["/order-success", detail['id']]);
      });
    }

    savePurchasedProduct(productList: ProductVO[] , shipDetail: ShippingInfo) {
      productList.forEach(product=> {

      this.purchaseData.push(new PurchasedProductInfo(null,shipDetail.id,product.id, 
        product.quantityId, this.userName,shipDetail.placedDate,product.title, product.price));
        console.log(this.purchaseData);    
      })
      if(this.purchaseData) this.productService.savePurchasedProduct(this.purchaseData).subscribe(data=> console.log(data));
    }

}
