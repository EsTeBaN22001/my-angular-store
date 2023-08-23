import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  imgParent = ''
  showImg = true
  token = ''

  // imagen para el input:file
  imgRta = ''

  constructor(
    private userService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {

    const token = this.tokenService.getToken()

    if(token){
      this.authService.profile()
      .subscribe()
    }

  }

  onLoaded(img: string){
    console.log(img)
  }

  toggleImg(){
    this.showImg = !this.showImg
  }

  createUser(){
    this.userService.create({
      email: 'estebanredon.dev@gmail.com',
      avatar: 'https://picsum.photos/640/640?r=8581',
      name: 'Esteban',
      password: 'esteban123',
      role: 'admin'
    })
    .subscribe( rta => {
      console.log(rta)
    })
  }

  downloadPdf(){
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event){

    const element = event.target as HTMLInputElement
    const file = element.files?.item(0)

    if(file){
      
      this.filesService.uploadFile(file)
      .subscribe( rta => {
        this.imgRta = rta.location
      } )

    }
    

  }

}
