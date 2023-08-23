import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null
  product: Product | null = null
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ){}

  ngOnInit(){
    this.route.paramMap
    .pipe(
      switchMap( (params) => {
        this.productId = params.get('id')
        if(this.productId){
          return this.productService.getOne(this.productId)
        }
        return [null]
      })
    )
    .subscribe( data => {
      this.product = data
    })
  }

  goToBack(){
    this.router.navigate(['/home'])
  }

}