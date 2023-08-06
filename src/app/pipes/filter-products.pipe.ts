import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Product[], search: string): Product[] {
    return products.filter(p =>
      p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()
    ))
  }

}
