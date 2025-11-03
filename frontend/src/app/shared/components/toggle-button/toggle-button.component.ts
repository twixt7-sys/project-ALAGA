import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-toggle-button',
  standalone: false,
	templateUrl: './toggle-button.component.html',
	styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButton {
	selected: 'login' | 'register' = 'login';

	@Output() toggled = new EventEmitter<'login' | 'register'>();

	select(option: 'login' | 'register') {
		this.selected = option;
		this.toggled.emit(option);
	}
}
