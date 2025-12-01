import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
}
