import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksService } from '../books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BookDetailComponent implements OnInit {
  book?: Book;
  loading = false;
  errorMsg = '';

  constructor(private route: ActivatedRoute, private booksService: BooksService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.booksService.getBook(id).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load book details.';
        this.loading = false;
      }
    });
  }
}