import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router
  ) { }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email === this.email && user.password === this.password) {
      this.router.navigate(['/']).then(r => r);
    }
  }

}
