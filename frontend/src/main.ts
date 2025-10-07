import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main>
      <img [src]="url" alt="Alaga Logo" width="200" class="auth-logo"/>
      <h1 class="text-3xl font-bold underline">{{title}}</h1>
      <p>Your trusted partner in pet care</p>
    </main>
  `
})
class App {
  title = 'ALAGA: Pet Supplies E-store';
  url = 'https://i.imgur.com/4ZLHm0Y.png';
}

bootstrapApplication(App);
