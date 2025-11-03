import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../shared/components/components-module';

import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  declarations: [
    Login,
    Register
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    Login,
    Register
  ]
})
export class AuthModule { }
