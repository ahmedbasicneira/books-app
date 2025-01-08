import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  providers: [BookService], 
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(response => {
      console.log('Book deleted', response);
      this.loadBooks();
    });
  }

  createBook() {
    this.router.navigate(['/admin/create-book']);
  }
}
