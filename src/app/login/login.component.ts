import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fadeInAnimation, fadeOutAnimation } from 'angular-animations';
import { UserServiceService } from '../services/user-service.service';
import { AtuhServiceService } from '../services/atuh-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInAnimation({ anchor: 'enter', duration: 5000, delay: 100 }),
    fadeOutAnimation()
  ]
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  isFormLogin:boolean = true;
  changeForm:boolean = false;
  emailReg  = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  submitted:boolean = false;
  loading:boolean = false;
  errorMessage:string = "";
  error:boolean = false;
  redirect:boolean = false;

  constructor(private fb: FormBuilder,
     private service:UserServiceService,
     private authService: AtuhServiceService,
     private router:Router
      ) {

     this.createForm();
     let token = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
     if(token !== null ){
      this.router.navigate(['/tasks']);
     }

  }

  ngOnInit() {

  }

  createForm(){
    this.myForm = this.fb.group({
      name: ['', []],
      email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  singForm(){
    this.isFormLogin = false;
    this.error = false;

    setTimeout( () => {
      this.isFormLogin = !this.isFormLogin;
      this.changeForm =  !this.changeForm;
      this.myForm.controls['name'].setValidators([]);
      this.myForm.controls['password'].setValidators([Validators.required, Validators.minLength(1)]);
      this.myForm.controls['name'].setValue('');
      this.myForm.controls['email'].setValue('');
      this.myForm.controls['password'].setValue('');
      this.submitted = false;

      if(this.changeForm){
        this.myForm.controls['name'].setValidators([Validators.required, Validators.minLength(3)]);
        this.myForm.controls['password'].setValidators([Validators.required, Validators.minLength(3)]);
      }
    }, 500);
  }

  onSubmit(){

    this.submitted = true;
    let { valid } = this.myForm;
    let { name, email, password } = this.myForm.value;
    if(valid){

      this.loading = true;
      this.error = false;

      if(this.changeForm){

        setTimeout( () => {

          this.service.saveUser(this.myForm.value).subscribe(
            (data:any) => {

              this.loading = false;

              if(data.status === 2){
                  this.error = true;
                  this.errorMessage = "El usuario ya existe.";
                  return;
              }

              localStorage.setItem('token', data.token);
              this.router.navigate(['/tasks']);

             },
            (error) => {
               this.error = true;
               this.errorMessage = "Ha ocurrido un error.";
               this.loading = false;
             }
           );

        }, 1000);

      }else{

        setTimeout( () => {

          this.service.loginUser(this.myForm.value).subscribe(
            (data:any) => {

              this.loading = false;

              if(data.status === 2){
                  this.error = true;
                  this.errorMessage = "Correo o contraseña inválida";
                  return;
              }

              //localStorage.setItem('redirect', 'true');
              localStorage.setItem('token', data.token);
              this.router.navigate(['/tasks']);


             },
            (error) => {
               this.error = true;
               this.errorMessage = "Ha ocurrido un error.";
               this.loading = false;
             }
           );

        }, 1000);

      }

      // setTimeout(() => {

      //   this.loading = false;
      //   this.errorMessage = "Este correo ya existe.";
      //   this.error = true;

      //  }, 2000);
    }

  }

}
