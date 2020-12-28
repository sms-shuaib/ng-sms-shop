import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ProductVO } from 'src/app/common/product';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy, AfterViewInit{
  product: ProductVO[];
  filterProduct: ProductVO[] = [];
  items: ProductVO[];
  itemCount: number;
  subscription: Subscription;
  //dataSource: DataTableResource<ProductVO>;

  displayedColumns: string[] = ['title', 'price' , 'actions'];
  dataSource = new MatTableDataSource<ProductVO>();

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort , {static: false}) sort: MatSort;

  constructor(private productService: ProductService) {
    
   }

  ngOnInit(): void {
    this.subscription = this.productService.getAll().subscribe(data=> 
      { 
        this.filterProduct = this.product= data;
        this.dataSource.data =this.filterProduct;

                // this.initializeTable(data);
      });
      console.log(this.product);
  }


   ngOnDestroy() {
    this.subscription.unsubscribe();
   }

   ngAfterViewInit() { 
     this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
   
  filter(query: string){
   let filterProduct = (query) ? this.product.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())) : this.product;
   // this.dataSource.filter = query.trim().toLowerCase();
   this.dataSource.data = filterProduct;
    
  }

  // private initializeTable(data: ProductVO[]){
  //   this.dataSource = new DataTableResource(data);
  //   this.dataSource.query({ offset: 0 })
  //   .then(items=> this.items = items);
  //   this.dataSource.count().then(count=> this.itemCount = count);
  // }

  // reloadItems(value: any) {
  //   if(!this.dataSource) return;
    
  //   this.dataSource.query(value)
  //   .then(items=> this.items = items);
  // }


}
