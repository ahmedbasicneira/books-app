import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'books-app';
  isLoggedIn: boolean = false;
  userRole: string = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user; 
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role; 
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    this.userRole = ''; 
  }

  
}
