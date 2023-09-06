import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/v1/users`

  constructor(
    private http:HttpClient
  ) { }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiUrl, dto)
    .pipe(
      catchError(() => throwError(() => 'Hubo un problema al registrarse. Verifique que todos los campos estén completos de manera correcta'))
    )
  }

  getAll(){
    return this.http.get<User[]>(this.apiUrl)
  }
}
