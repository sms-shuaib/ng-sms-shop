import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductVO } from '../common/product';
import { Observable, Subscription } from 'rxjs';
import { CategoryServiceService } from '../service/category-service.service';
import { Category } from '../common/category';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../common/shoppingcart';
import { DataService } from '../common/data.service';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { AuthenticationService } from '../auth-service/authentication.service';
import { AppUser } from '../common/app-user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  product: ProductVO[];
  filteredProduct: ProductVO[];
  category$: Observable<Category[]>
  category: string;
  username;
  appUser: AppUser;
  subscription: Subscription;
  shoppingCartItem: number;


  constructor(private productService: ProductService,
    private categoryService: CategoryServiceService,
    private route: ActivatedRoute,
    private shoppingService: ShoppingCartService,
    private dataService: DataService,
    private authService: AuthenticationService) {
    this.category$ = this.categoryService.getAll();
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get("category");
    });
    if (this.authService.isUserLoggedIn()) {
      this.authService.getAppUser(this.authService.getUserName()).subscribe(user => {
        this.dataService.setAppUser(user);
      });
    }

  }

  ngOnInit(): void {
    this.filteredData(this.category);
  }

  filteredData(value: string) {
    if (value === "All Category") {
      this.loadData();
      return;
    }
    (value) ? this.productService.getByCategory(value)
      .subscribe(value => this.filteredProduct = value) : this.loadData();
  }

  loadData() {
    this.productService.getAll().subscribe(value => {
      this.filteredProduct = value;
    });
  }

  addToCard(product: ProductVO) {
    this.updateQuantity(product.id, true);
    this.dataService.changeData(1);
  }

  removeCart(id: number) {
    this.updateQuantity(id, false);
    this.dataService.changeData(-1);
  }

  updateQuantity(product: number, isAdd: boolean) {
    this.shoppingService.updateQunatityByProductId(product, isAdd).subscribe(data => {
      console.log(data);
      if (!this.category) {
        return this.loadData();
      }
      this.filteredData(this.category);
    });
  }


  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
