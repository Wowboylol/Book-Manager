import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.css'],
	providers: [BookService]
})

export class BookListComponent implements OnInit 
{
	@Output() changedBook = new EventEmitter<Book>();
	private bookService:BookService
	private _books:Book[];
	
	public constructor(bookService:BookService) 
	{
		this.bookService = bookService;
	}

	ngOnInit(): void 
	{
		this._books = this.bookService.getBooks();
	}

	public onChangeBook(selection:Book)
	{
		this.changedBook.emit(selection);
	}

	public get books():Book[] { return this._books; }
}
