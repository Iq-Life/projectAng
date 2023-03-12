import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { product as data } from './data/products';
import { ProductsService } from './services/products.cervice';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Products'
  // products: IProduct[] = []
  loading= false
  products$: Observable<IProduct[]>

  constructor(private productsService: ProductsService){

  }

  ngOnInit(): void{
    this.loading = true
    this.products$ = this.productsService.getAll().pipe(
      tap(() => this.loading = false)
    )
    // .subscribe(products => {
    //   this.products = products
    //   this.loading = false
    // })
  }
}
