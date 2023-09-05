import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.buildForm()
  }

  // Funciones para validar si un input es correcto o incorrecto
  validInput(input: string){
    return this.form.get(input)?.touched && this.form.get(input)?.valid
  }

  invalidInput(input: string){
    return this.form.get(input)?.touched && this.form.get(input)?.invalid
  }

  // Getters para los inputs del formulario
  get emailField(){
    return this.form.get('email')
  }

  get passwordField(){
    return this.form.get('password')
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    })
  }

  login(){
    if(this.form.valid){
      
      const email = this.form.value.email
      const password = this.form.value.password
      
      this.authService.loginAndGet(email, password)
      .subscribe({
        complete: () => this.router.navigate(['/profile']),
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Inicio de sesión incorrecto',
            text: err
          })
        }
      })

    }else{
      this.form.markAllAsTouched()
    }
  }
}
