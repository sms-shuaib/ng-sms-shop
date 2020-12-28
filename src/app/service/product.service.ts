import { Injectable } from '@angular/core';
import { ProductVO } from '../common/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { ShoppingCart } from '../common/shoppingcart';
import { partitionArray } from '@angular/compiler/src/util';
import { FormsModule } from '@angular/forms';
import { PurchasedProductInfo } from '../common/purchased-product-info';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:8090/api/";

  constructor(private httpService: HttpClient) { }

  save(product: ProductVO): Observable<ProductVO[]>{
  
     return this.httpService.post<ProductVO[]>(this.baseUrl + 'saveProduct' , product);
  }

  getAll(): Observable<any> {
    return this.httpService.get<ProductVO[]>(this.baseUrl+ "getAll");
  }

  getId(productId: number){
    return this.httpService.get<ProductVO[]>(this.baseUrl + "getId" + productId);
  }

  update(productId: number, product: ProductVO) {
    return this.httpService.put<ProductVO[]>(this.baseUrl + "update" + productId, product);
  }

  delete(productId: number): Observable<any>{
    return this.httpService.delete(this.baseUrl + "delete" +productId);
  }
  getByCategory(category: string) {
    return this.httpService.get<ProductVO[]>(this.baseUrl + "filteredCategory" + category);
  }

  savePurchasedProduct(purchasedData: PurchasedProductInfo[]) {
    return this.httpService.post<PurchasedProductInfo[]>(this.baseUrl + "savePurchasedData", purchasedData);
  }

  getPurchasedData(shipId: number) {
    return this.httpService.get<PurchasedProductInfo[]>(this.baseUrl + "getPurchasedData" + shipId);
  }

}
