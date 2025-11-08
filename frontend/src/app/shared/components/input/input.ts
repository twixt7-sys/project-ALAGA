import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
}
