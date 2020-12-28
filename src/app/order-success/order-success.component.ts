import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShippingInfo } from '../common/shippingInfo';
import { DataService } from '../common/data.service';
import { ProductVO } from '../common/product';
import { ProductService } from '../service/product.service';
import { PurchasedProductInfo } from '../common/purchased-product-info';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  id;
  shipDetail: ShippingInfo = new ShippingInfo;
  shippedItems: PurchasedProductInfo [];
  totalPrice;
  totalShoppingCart;

  constructor(private activeRoute:ActivatedRoute,
    private shoppingService:ShoppingCartService,
    private productService: ProductService) {
      this.id= this.activeRoute.snapshot.paramMap.get("id");
     }

  ngOnInit(): void {
    this.shoppingService.getDetail(this.id).subscribe(detail=>{
      this.shipDetail = detail;
    });
    this.productService.getPurchasedData(this.id).subscribe(product=>{
      this.shippedItems = product;
      this.totalPrice = 0;
      this.totalShoppingCart = 0;
      product.forEach(value=>{
        let aggregatePrice = value.price * value.quantityId;
        this.totalPrice += aggregatePrice;
        this.totalShoppingCart += value.quantityId;
      });
    })
    
  }

}
