import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  // initialize(): Promise<void>{
    
  //   const token = this.tokenService.getToken()

  //   if(token){
  //     return this.authService.profile()
  //   }

  // }
}
