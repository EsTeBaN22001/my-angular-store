import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-control',
  templateUrl: './forms-control.component.html',
  styleUrls: ['./forms-control.component.scss']
})
export class FormsControlComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.form.valueChanges
    .subscribe( value => {
      console.log(value)
    })
  }

  // validar si un input es VALID o INVALID
  validInput(input: string){
    return this.form.get(input)?.touched && this.form.get(input)?.valid
  }

  invalidInput(input: string){
    return this.form.get(input)?.touched && this.form.get(input)?.invalid
  }

  // Getters de los inputs del formulario
  get nameField(){
    return this.form.get('name')
  }

  get emailField(){
    return this.form.get('email')
  }

  get categoryField(){
    return this.form.get('category')
  }

  get tagField(){
    return this.form.get('tag')
  }

  get agreeField(){
    return this.form.get('agree')
  }

  get genderField(){
    return this.form.get('gender')
  }

  get zoneField(){
    return this.form.get('zone')
  }
  
  // Obtener el valor de los inputs por un botón
  getNameValue(){
    console.log(this.form.get('name')?.value)
  }

  getEmailValue(){
    console.log(this.form.get('email')?.value)
  }

  // Método para el SUBMIT del formulario
  save(){
    if(this.form.valid){
      console.log(this.form.value)
    }else{
      this.form.markAllAsTouched()
    }
  }

  // Construir el formulario con FormBuilder
  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      category: ['category-1'],
      tag: [''],
      agree: [false, Validators.requiredTrue],
      gender: ['', Validators.required],
      zone: ['', Validators.required]
    })
  }

}
