import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  img!:string
  
  @Input('img') set changeImg(newImg: string){
    this.img = newImg
    // console.log('change just img: ', this.img)
  }
  @Output() loaded = new EventEmitter<string>()
  imgDefault = './assets/images/default.png'

  // counter = 0
  // counterFn: number | undefined

  constructor(){
    // before render
    // Aquí NO se debe correr peticiones o funciones ASÍNCRONAS
    // Solo se ejecuta una vez por cada instancia que se cree de este componente
    // console.log('constructor', 'imgValue: ', this.img)
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before render
    // Change inputs values
    // Se ejecuta cada vez que actualicemos el valor de un input
    // console.log('ngOnChanges', 'imgValue: ', this.img)
  }

  ngOnInit() {
    // Before render
    // Aquí SI podemos ejecutar peticiones o funciones ASÍNCRONAS
    // Solo se ejecuta una vez por cada instancia que se cree de este componente
    // console.log('ngOnInit', 'imgValue: ', this.img)
    // this.counterFn = window.setInterval(()=>{
    //   this.counter++
      // console.log('run counter')
    // }, 1000)
  }

  ngAfterViewInit() {
    // After render
    // Handler children
    // Permite modificar elementos del template sin ir al template
    // Esto se utiliza en las DIRECTIVAS
    // console.log('ngAfterViewInit')
  }

  ngOnDestroy() {
    // Se ejecuta cuando se elimina la instancia del componente
    // console.log('ngOnDestroy')
    // window.clearInterval(this.counterFn)
  }

  imgError(){
    this.img = this.imgDefault
  }

  imgLoaded(){
    this.loaded.emit(this.img)
  }

}
