import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private apiUrl = 'https://booklending-api-raghda-test.jahezteam.com/api/Books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  borrowBook(id: number): Observable<{ dueDate: string }> {
    return this.http.post<{ dueDate: string }>(`${this.apiUrl}/${id}/borrow`, {});
  }

  returnBook(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/return`, {});
  }
}