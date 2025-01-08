import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  template: `
    <div *ngIf="books.length > 0">
      <div *ngFor="let book of books">
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
        <p>{{ book.description }}</p>
      </div>
    </div>
  `
})
export class BooksComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }
}
