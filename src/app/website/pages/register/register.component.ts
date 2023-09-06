import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnExit } from './../../../guards/exit.guard';
import { customValidators } from './../../../validators/custom-validators';
import { CreateUserDTO } from './../../../models/user.model';
import { UsersService } from './../../../services/users.service'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  form: FormGroup = new FormGroup({})
  customValidators = customValidators

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ){
    this.buildForm()
  }

  // Getters para los inputs
  get emailField(){
    return this.form.get('email')
  }

  get nameField(){
    return this.form.get('name')
  }

  get passwordField(){
    return this.form.get('password')
  }

  get confirmPasswordField(){
    return this.form.get('confirmPassword')
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    },{
      validators: customValidators.matchPasswords
    })
  }

  register(){
    if(this.form.valid){
      
      // Elimino la propiedad de confirmar contraseña ya que no la necesito enviar a la api. Es solo una validación del front-end
      delete this.form.value.confirmPassword
      
      const userDTO: CreateUserDTO = {
        ...this.form.value,
        role: 'customer',
        avatar: 'https://picsum.photos/640/640?r=8581'
      }

      this.userService.create(userDTO)
      .subscribe({
        complete: () => this.router.navigate(['/login']),
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Registro incorrecto',
            text: err
          })
        }
      })

    }else{
      this.form.markAllAsTouched()
    }
  }

  onExit(){
    return confirm('Estás seguro/a salir?')
  }

}
