import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost/books-backend/api/books.php';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addBook(book: { title: string, author: string, description: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, book);
  }

  updateBook(book: { id: number, title: string, author: string, description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
