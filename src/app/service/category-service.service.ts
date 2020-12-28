import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Category } from '../common/category';
import { Observable } from 'rxjs';
import { ProductVO } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpService: HttpClient) { }

  baseUrl: string = "http://localhost:8090/api/";

  getAll(): Observable<Category[]>{
    return this.httpService.get<Category[]>(this.baseUrl + 'category');
  }
}
