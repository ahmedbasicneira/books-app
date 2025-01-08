import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  providers: [BookService], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadLatestBooks();
  }

  loadLatestBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books.slice(-4);
    });
  }

  viewBookDetails(id: number) {
    const isLoggedIn = !!localStorage.getItem('user');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([`/book/${id}`]); 
    }
  }
}
