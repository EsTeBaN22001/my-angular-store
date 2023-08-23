import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { CreateProductDTO, Product } from '../../../models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = []
  @Input() set productId(id: string | null){
    if(id){
      this.onShowDetail(id)
    }
  }
  @Output() loadMore: EventEmitter<string> = new EventEmitter<string>()

  myShoppingCart: Product[] = []
  total = 0
  showProductDetail = false
  productChosen!: Product

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  onAddToShoppingCart(product: Product){

    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
    
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading'
    
    if(!this.showProductDetail){
      this.showProductDetail = true
    }

    this.productsService.getOne(id)
    .subscribe(data => {
      this.productChosen = data
      this.statusDetail = 'success'
    }, errorMsg => {
      this.statusDetail = 'error'
      alert(errorMsg)
    })
  }

  readAndUpdate(id: string){

    this.productsService.getOne(id)
    .pipe(
      switchMap( product => this.productsService.update(product.id, {title: 'change'}) )
    )
    .subscribe( response => {
      console.log(response)
    })
    zip(
      this.productsService.getOne(id),
      this.productsService.update(id, {title: 'nuevo título'})
    )
    .subscribe( response => {

      const read = response[0]
      const update = response[1]

      console.log(`Read: ${read}`)
      console.log(`Update: ${update}`)

    })
    
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Desc. Nuevo producto',
      images: [`https://picsum.photos/200/300`],
      price: 1000,
      categoryId: 2
    }
    this.productsService.create(product)
    .subscribe( data => {
      this.products.unshift(data)
    } )
  }

  updateProduct(){
    const changes = {
      title: 'Nuevo título'
    }
    const id = this.productChosen.id
    this.productsService.update(id, changes)
    .subscribe( data => {
      console.log('updated', data)
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    } )
  }

  deleteProduct(){
    const id = this.productChosen.id
    this.productsService.delete(id)
    .subscribe( () => {
      
      const productIndex = this.products.findIndex( item => item.id == this.productChosen.id )

      this.products.splice(productIndex, 1)
      this.showProductDetail = false

    } )
  }

  onLoadMore(){
    this.loadMore.emit()
  }

}
