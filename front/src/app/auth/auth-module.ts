import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Register } from './register/register';



@NgModule({
  declarations: [
    Login,
    Signup,
    Register
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
