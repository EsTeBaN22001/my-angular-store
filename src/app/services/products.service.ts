import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { checkTime } from '../interceptors/time.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/v1`
  // private apiUrl = '/products/'
  
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number){

    let params = new HttpParams()

    if(limit !== undefined && offset !== undefined){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    
    return this.http.get<Product[]>(`${this.apiUrl}/products/`, {params})
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))

    )
    
  }

  getOne(id: string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status == 500){
          return throwError('Ups... Algo salió mal en el servidor')
        }
        if(error.status == 404){
          return throwError('Ups... El producto no existe')
        }
        return throwError('Ups... algo salió mal')
      })
    )
  }

  getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: {limit, offset}
    })
  }

  getByCategory(categoryId: string, limit?: number, offset?: number){

    let params = new HttpParams()

    if(limit && offset != null){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }

    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
    
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`, dto)
  }

  update(id:string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`)
  }

}
