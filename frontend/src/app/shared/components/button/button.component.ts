// button.component.ts
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-button',
	standalone: false,
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class Button {
	@Input() label = '';
	@Input() variant: 'primary' | 'secondary' = 'primary';
	@Input() type: 'button' | 'submit' = 'button';
  @Input() classAppend: string = '';
}
