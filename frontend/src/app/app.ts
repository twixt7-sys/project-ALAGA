import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './shared/components/components-module'
import { Auth } from './features/auth/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front');
}
