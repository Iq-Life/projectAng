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
  products:IProduct[] = []

  constructor(private productsService: ProductsService){

  }

  ngOnInit(): void{
    this.loading = true
    this.productsService.getAll().subscribe(products => {
      this.products = products
      this.loading = false
    })
  }
}
