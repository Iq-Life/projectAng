import { Component } from '@angular/core';
import { IProduct } from './models/product';
import { product as data } from './data/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project Ang'

  products: IProduct[] = data
}
