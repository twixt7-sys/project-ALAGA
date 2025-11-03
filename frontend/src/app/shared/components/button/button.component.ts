// button.component.ts
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-button',
	standalone: true,
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() label = '';
	@Input() variant: 'primary' | 'secondary' = 'primary';
	@Input() type: 'button' | 'submit' = 'button';
}
