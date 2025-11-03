import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../components/button/button.component';
import { Card } from '../components/card/card.component';


@NgModule({
  declarations: [Button, Card],
  imports: [
    CommonModule
  ],
  exports: [Button, Card]
})
export class ComponentsModule { }
