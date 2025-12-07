import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() product: any = null;
}
