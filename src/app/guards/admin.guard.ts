import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from './../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.user$
    .pipe(
      map(user => {
        if(user?.role === 'admin'){
          return true
        }
        
        this.router.navigate(['/home'])
        return false
      })
    )

  }
  
}