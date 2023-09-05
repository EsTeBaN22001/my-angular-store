import { AbstractControl } from "@angular/forms";

export class customValidators{

  static matchPasswords(control: AbstractControl){
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value
  
    if(password == confirmPassword){
      return null
    }
  
    return {match_password: true}
  
  }
}