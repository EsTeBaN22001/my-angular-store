import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { tap, switchMap, BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`

  private user = new BehaviorSubject<User | null>(null)

  // Se utiliza el símbolo $ al final del nombre de la variable porque así se identifican por convensión a los observadores
  user$ = this.user.asObservable()

  constructor(
    private http:HttpClient,
    private tokenService: TokenService,
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap( response => { this.tokenService.saveToken(response.access_token) } ),
      catchError( (err: HttpErrorResponse) => {

        if(err.status == 401){
          return throwError(() => 'El usuario no existe o las credenciales son incorrectas...')
        }

        return throwError(() => 'Hubo algún problema al iniciar sesión')

      })
    )
  }

  profile(){
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap( user => {
        console.log('Usuario actualizado: ', user)
        this.user.next(user)
      })
    )
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
    .pipe(
      switchMap( () => this.profile() )
    )
  }

  logout(){
    this.tokenService.removeToken()
  }
}
