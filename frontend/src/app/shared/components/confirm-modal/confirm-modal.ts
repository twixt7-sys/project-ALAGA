import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {
  @Input() product: any = {};
  viewProduct(p: Product) {
    this.product = p;
  }

  @Output() yesEvent = new EventEmitter<void>();
  @Output() noEvent = new EventEmitter<void>();

  yes(out: any){ this.yesEvent.emit(out); }
  no(out: any){ this.noEvent.emit(out); }
}
