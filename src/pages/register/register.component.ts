import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  plainPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password === this.plainPassword) {
      localStorage.setItem('user', JSON.stringify({ email: this.email, password: this.password }));
      this.router.navigate(['/']).then(r => r);
    }
  }
}
