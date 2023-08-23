import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.API_URL}/api/v1/categories`

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number){

    let params = new HttpParams()

    if (limit != null){
      params = params.set('limit', limit)
    }
    
    return this.http.get<Category[]>(this.apiUrl, { params })

  }
}
