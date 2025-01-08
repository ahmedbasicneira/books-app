import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
   imports: [HttpClientModule, FormsModule], 
    providers: [AuthService], 
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = { username: '', email: '', password: '' };
  newUsername = '';
  newPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.user.email = user.email;
      this.user.username = user.username;
    } else {
      this.router.navigate(['/login']); 
    }
  }

  updateProfile() {
    if (this.newUsername || this.newPassword) {
      const updatedData = {
        email: this.user.email,
        username: this.newUsername || this.user.username,
        password: this.newPassword || this.user.password
      };

      this.authService.updateProfile(updatedData).subscribe(
        response => {
          if (response.message) {
            this.successMessage = response.message;
            this.errorMessage = '';

            const updatedUser = { ...this.user, username: updatedData.username };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        },
        error => {
          this.errorMessage = error.error.error || 'Something went wrong';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please provide new username or password.';
    }
  }
}
