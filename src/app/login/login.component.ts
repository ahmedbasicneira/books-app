import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule], 
  providers: [AuthService], 
  template: `
    <div class="container mt-1">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header text-center">
              <h3>Prijava</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="login()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input [(ngModel)]="email" name="email" id="email" type="email" class="form-control" placeholder="Email" required />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input [(ngModel)]="password" name="password" id="password" type="password" class="form-control" placeholder="Password" required />
                </div>
                <div class="mb-3 text-center">
                  <button type="submit" class="btn btn-primary w-100">Prijava</button>
                </div>
              </form>
            </div>
            <div class="card-footer text-center">
              <p>Nemas racun? <a href="/register">Registruj se</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} 

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(response => {
        console.log('Login successful', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/#']);
      }, error => {
        console.error('Login failed', error);
      });
  }
}
