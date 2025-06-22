import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.html',
  styleUrls: ['./book-management.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class BookManagementComponent implements OnInit {
  books: Book[] = [];
  bookForm!: FormGroup;
  editingBook?: Book;
  errorMsg = '';

  constructor(private booksService: BooksService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadBooks();
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['']
    });
  }

  loadBooks() {
    this.booksService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: () => (this.errorMsg = 'Failed to load books.')
    });
  }

  addBook() {
    if (this.bookForm.invalid) return;
    this.booksService.addBook(this.bookForm.value).subscribe({
      next: () => {
        this.loadBooks();
        this.bookForm.reset();
      },
      error: () => (this.errorMsg = 'Failed to add book.')
    });
  }

  editBook(book: Book) {
    this.editingBook = book;
    this.bookForm.patchValue(book);
  }

  updateBook() {
    if (!this.editingBook || this.bookForm.invalid) return;
    this.booksService.updateBook(this.editingBook.id, this.bookForm.value).subscribe({
      next: () => {
        this.loadBooks();
        this.editingBook = undefined;
        this.bookForm.reset();
      },
      error: () => (this.errorMsg = 'Failed to update book.')
    });
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book.id).subscribe({
      next: () => this.loadBooks(),
      error: () => (this.errorMsg = 'Failed to delete book.')
    });
  }
}