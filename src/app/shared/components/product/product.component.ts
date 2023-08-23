import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product
  @Output() addedProduct = new EventEmitter<Product>()
  @Output() showDetail = new EventEmitter<string>()

  onAddToCart(){
    this.addedProduct.emit(this.product)
  }

  onShowDetail(){
    this.showDetail.emit(this.product.id)
  }

}
