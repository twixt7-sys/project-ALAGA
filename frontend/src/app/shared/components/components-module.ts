import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../components/button/button.component';
import { Card } from '../components/card/card.component';
import { TextInput } from '../components/text-input/text-input.component';
import { ToggleButton } from './toggle-button/toggle-button.component';
import { InputComponent } from './input/input';
import { DropdownComponent } from './dropdown/dropdown';
import { Navbar } from './navbar/navbar';
import { Modal } from './modal/modal';


@NgModule({
  declarations: [Button, Card, TextInput, ToggleButton, InputComponent, DropdownComponent, Navbar, Modal],
  imports: [
    CommonModule
  ],
  exports: [Button, Card, TextInput, ToggleButton, InputComponent, DropdownComponent, Navbar, Modal]
})
export class ComponentsModule { }
