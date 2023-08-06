import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss']
})
export class ModalAddProductComponent implements OnInit {
  @Input() title: string
  isVisible$ = new BehaviorSubject<boolean>(false)

  constructor(public productService: ProductsService) { }

  ngOnInit(): void {
  }

}
