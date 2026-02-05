import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding-top: 76px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'BloomVerse';
}