import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class Card {
  @Input() title = '';
  @Input() content = '';
  @Input() variant: 'elevated' | 'outlined' | 'flat' = 'elevated';
  @Input() backgroundColor: string = '#ffffff';
  @Input() borderRadius: string = '8px';
}

