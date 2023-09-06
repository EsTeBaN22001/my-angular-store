import { AbstractControl, FormGroup } from "@angular/forms";

export class customValidators{

  static matchPasswords(control: AbstractControl){
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value
  
    if(password === confirmPassword){
      return null
    }
  
    return {match_password: true}
  
  }

  // Función que valida que un input es válido para agregar una clase en específico
  static validInput(input: string, form: FormGroup){
    return form.get(input)?.touched && form.get(input)?.valid
  }

  // Función que valida que un input es inválido para agregar una clase en específico
  static invalidInput(input: string, form: FormGroup){
    return form.get(input)?.touched && form.get(input)?.invalid
  }
}