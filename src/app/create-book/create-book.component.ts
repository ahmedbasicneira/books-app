import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [FormsModule, HttpClientModule], 
  providers: [BookService], 
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {
  title: string = '';
  author: string = '';
  description: string = '';
  image: File | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }


  createBook() {
    const bookData = {
      title: this.title,
      author: this.author,
      description: this.description,
      image: this.image
    };

    this.bookService.addBook(bookData).subscribe(response => {
      console.log('Book created successfully', response);
      this.router.navigate(['/admin/dashboard']); 
    }, error => {
      console.error('Error creating book', error);
    });
  }
}
