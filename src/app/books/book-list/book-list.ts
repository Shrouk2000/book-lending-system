import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  errorMsg = '';

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.booksService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load books.';
        this.loading = false;
      }
    });
  }

  viewDetails(book: Book) {
    this.router.navigate(['/books', book.id]);
  }

  borrowBook(book: Book) {
    this.booksService.borrowBook(book.id).subscribe({
      next: (res) => {
        book.available = false;
        book.dueDate = res.dueDate;
      },
      error: () => {
        this.errorMsg = 'Failed to borrow book.';
      }
    });
  }

  returnBook(book: Book) {
    this.booksService.returnBook(book.id).subscribe({
      next: () => {
        book.available = true;
        book.dueDate = undefined;
      },
      error: () => {
        this.errorMsg = 'Failed to return book.';
      }
    });
  }
}