import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../../services/store.service'
import { AuthService } from './../../../services/auth.service';
import { CategoriesService } from './../../../services/categories.service';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false
  counter = 0
  profile: User | null = null
  categories!: Category[]

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ){}

  ngOnInit(){
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getAllCategories(3)
    this.authService.user$.subscribe( user => {
      this.profile = user
    })
  }
  
  toggleMenu(){
    this.activeMenu = !this.activeMenu
  }

  // Profile & user
  login(){
    this.authService.loginAndGet('estebanredon.dev@gmail.com', 'esteban123')
    .subscribe( () => {
      this.router.navigate(['/profile'])
    })
  }

  logout(){
    this.authService.logout()
    this.profile = null
    this.router.navigate(['/home'])
  }
  
  getAllCategories(limit?: number){
    this.categoriesService.getAll(limit)
    .subscribe( data => {
      this.categories = data
    })
  }

}
