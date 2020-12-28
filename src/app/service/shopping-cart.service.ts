import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductVO } from '../common/product';
import { ShippingInfo } from '../common/shippingInfo';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCount: number;

  constructor(private httpService: HttpClient) { }

  baseUrl: string = "http://localhost:8090/api/";

  updateQunatityByProductId(productId: number , isAdd: boolean) {
    return this.httpService.put<ProductVO[]>(this.baseUrl + "updateQuantity" + "/" + productId + "/" + isAdd, 
     {'productId ' : JSON.stringify(productId),'isAdd': JSON.stringify(isAdd)});
  }

  getProductByQuantity(){
    return this.httpService.get<ProductVO[]>(this.baseUrl + "getProductByQuantity");
  }

  saveShipDetail(shipDetail: ShippingInfo) {
   return this.httpService.post<ShippingInfo>(this.baseUrl + "saveShipDetail", shipDetail);
  }

  getDetail(shipId: number) {
    return this.httpService.get<ShippingInfo>(this.baseUrl + "getShipDetail" + shipId);
  }

  updateProductList(productList: ProductVO[]) {
    return this.httpService.put<ProductVO[]>(this.baseUrl + "updateProductList", productList);
  }

  getAllDetail() {
    return this.httpService.get<ShippingInfo[]>(this.baseUrl + "getAllDetail");
  }
}
