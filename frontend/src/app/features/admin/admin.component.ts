import { Component } from '@angular/core';
import { AdminDashboardComponent } from './dashboard/dashboard';

@Component({
  selector: 'app-admin',
  imports: [AdminDashboardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class Admin {

}
