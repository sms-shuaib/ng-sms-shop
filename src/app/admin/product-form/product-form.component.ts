import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { getLocaleDateFormat } from '@angular/common';
import { ProductService } from 'src/app/service/product.service';
import { ProductVO } from 'src/app/common/product';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  categoryData: any =[];
  product: any = {};
  id: string;
  
  constructor(private categoryService: CategoryServiceService, 
    private productService: ProductService,
    private route:Router,
    private activedRoute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.subscription =  this.categoryService.getAll().subscribe(data=>{
      this.categoryData = data;
     }, (error)=>{
      console.log(error);
     }
     );
     this.id = this.activedRoute.snapshot.paramMap.get("id");
     if(this.id) this.productService.getId(parseInt(this.id)).take(1).subscribe(data=>{ this.product = data});
     console.log(this.product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(product: ProductVO) {
    if(this.id) this.productService.update(parseInt(this.id), product).subscribe(update=> console.log(update));
    else 
    this.productService.save(product).subscribe(data=>console.log(data));
    this.navigate();
  }

  navigate(){
    this.route.navigate(["/admin/product"]);
    this.ngOnInit();
  }

  delete() {
    if(!confirm("Are you sure want to delete record")) return

    this.productService.delete(parseInt(this.id)).subscribe(data=>console.log(data));
    this.navigate();
  }

  backToProduct() {
    this.route.navigate(["/admin/product"]);
  }
}
