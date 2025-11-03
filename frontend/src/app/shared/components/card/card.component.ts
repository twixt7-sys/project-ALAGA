import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class Card {
  @Input() variant: 'elevated' | 'outlined' | 'flat' = 'elevated';
  @Input() alignment: 'left' | 'center' | 'right' = 'center';
  @Input() backgroundColor: string = '#ffffff';
  @Input() borderRadius: string = '8px';
  @Input() marginPadding: string[] = ['1rem', '1rem', '1rem', '1rem'];
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
