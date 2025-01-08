import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule], 
  providers: [AuthService], 
  template: `
    <div class="container mt-1">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header text-center">
              <h3>Registracija</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="register()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input [(ngModel)]="username" name="username" id="username" type="text" class="form-control" placeholder="Username" required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input [(ngModel)]="email" name="email" id="email" type="email" class="form-control" placeholder="Email" required />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input [(ngModel)]="password" name="password" id="password" type="password" class="form-control" placeholder="Password" required />
                </div>
                <div class="mb-3 text-center">
                  <button type="submit" class="btn btn-primary w-100">Registruj me</button>
                </div>
              </form>
            </div>
            <div class="card-footer text-center">
              <p>Imate racun? <a href="/login">Prijavi se</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ username: this.username, email: this.email, password: this.password })
      .subscribe(response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('Registration failed', error);
      });
  }
}
