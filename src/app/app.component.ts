import { Component } from '@angular/core';
import {HeaderComponent} from '../partials/header/header.component';
import {FooterComponent} from '../partials/footer/footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyYoutube';
}
