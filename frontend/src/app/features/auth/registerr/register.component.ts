import { Component, Directive } from '@angular/core';

@Directive({
  //variables x, y, height, width
  //body
  //no style
  //no html
})
class BisagUnsa{
  //parameters
}

@Component({
  selector: 'test',
  template: '<label>{{number}}</label>'
})
export class c1{
  number = 3;
}

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {}
