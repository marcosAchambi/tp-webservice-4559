import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForOf,
  DatePipe
} from '@angular/common';

import {
  BookService
} from '../../services/book.service';


interface book{
  synopsis: string;
  author: string;
  id: string;
  name: string;
  cover: string;
  position: number;
}

@Component({
  selector: 'app-book',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  books!: Array<book>;
  selectedDate: Date = new Date ();

  constructor(private bookService: BookService) {
  }
  ngOnInit(): void {
    this.viewBooks ();
  }

  viewBooks(): void {
    const year = this.selectedDate.getFullYear ().toString ();
    const month = (this.selectedDate.getMonth () + 1).toString ();
    this.bookService.getBook (year, month).subscribe ((data: any) => {
      const firstBook = data[0];
      if (firstBook && (firstBook.id || firstBook.book_id)) {
        const bookId = firstBook.id || firstBook.book_id;
        this.bookService.getBookById (bookId.toString ()).subscribe ((details: any) => {
          this.books = [{
            position: firstBook.position,
            name: firstBook.name,
            cover: firstBook.cover,
            id: bookId,
            author: Array.isArray (details.authors) ? details.authors.join (', ') : details.author,
            synopsis: details.synopsis
          }];
        });
      } else {
        this.books = [];
      }
    });
  }

  onDateChange(event: any): void {
    this.selectedDate = new Date (event.target.value);
    this.viewBooks ();
  }
}
