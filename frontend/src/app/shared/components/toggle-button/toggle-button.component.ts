import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ApiServices } from '../../../core/services/api-services';

@Component({
	selector: 'app-toggle-button',
  standalone: false,
	templateUrl: './toggle-button.component.html',
	styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButton {
  show = signal(false);
	selected: 'login' | 'register' = 'login';
  message: string = '';

  constructor(private msg: ApiServices) {
    this.message = this.msg.getData();
  }

	@Output() toggled = new EventEmitter<'login' | 'register'>();

	select(option: 'login' | 'register') {
		this.selected = option;
		this.toggled.emit(option);
	}
}
