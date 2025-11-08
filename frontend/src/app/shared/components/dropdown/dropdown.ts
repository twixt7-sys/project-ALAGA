import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
}
