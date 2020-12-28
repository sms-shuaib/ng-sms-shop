import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { DataService } from '../common/data.service';
import { ProductService } from '../service/product.service';
import { ProductVO } from '../common/product';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalShopCart: number;
  shoppingCart: ProductVO[]=[];
  totalPrice: number;
  quantityId: number;

  constructor(private productService: ProductService , 
    private shoppingService: ShoppingCartService ,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.totalShopCart = 0;
    this.productService.getAll().subscribe(product => {
       this.totalPrice = 0;
      product.forEach(element => {
        if(element.quantityId > 0) {
          let aggregatePrice = element.price * element.quantityId;
          element['price'] = aggregatePrice; 
          this.totalPrice += aggregatePrice;
          this.shoppingCart.push(element);
          this.dataService.addItems(element);
        }
        this.totalShopCart = this.totalShopCart + element.quantityId;
      });
    });
  }


  addToCard(productId: number) {
    this.updateQuantity(productId, true);
    this.dataService.changeData(1);
  }
     
  removeCart(id: number) {
    this.updateQuantity(id,false);
    this.dataService.changeData(-1);
  }

  updateQuantity(product:number , isAdd: boolean) {
    this.shoppingService.updateQunatityByProductId(product , isAdd).subscribe(data => {
      console.log(data); 
        this.shoppingCart = this.shoppingCart.map(item=>{
          if(item.id === product) {
            if(isAdd) {
              item.quantityId = item.quantityId  + 1;   
              item.price = item.price + data['price'];
              this.totalPrice = this.totalPrice + data['price'];
              this.totalShopCart += 1
            } else {
              item.quantityId = item.quantityId  - 1;
              item.price = item.price - data['price'];
              this.totalPrice = this.totalPrice - data['price'];
              this.totalShopCart -= 1
            }
          }
          return item;
        });
        this.dataService.totalCountItems(this.totalShopCart);
    });
  }

  clearCart() {
    this.shoppingCart.forEach(action => {
      action.quantityId = 0;
      this.productService.update(action.id,action).subscribe(data=>{
        console.log(data);
      });
      this.shoppingCart = [];
      this.totalPrice = 0;
      this.totalShopCart = 0;
      this.dataService.changeData(0);
    });
  }
}

