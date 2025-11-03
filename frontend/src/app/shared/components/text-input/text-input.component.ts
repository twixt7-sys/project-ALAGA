import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  standalone: false,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInput {
  @Input() placeholder: string = 'Enter text';
  @Input() value: string = '';
}
