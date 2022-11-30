import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book.service';

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css'],
	providers: [BookService]
})

export class BooksComponent implements OnInit 
{
	private _bookDetails:Book;
	private _bookService:BookService

	public constructor(bookService:BookService) 
	{
		this._bookService = bookService;
	}

	ngOnInit(): void 
	{
		this._bookService.getSelectedBook().subscribe((book:Book) => {
			this._bookDetails = book;
		})
	}

	public get bookDetails():Book { return this._bookDetails; }
	public set bookDetails(selection:Book) { this._bookDetails = selection; }
}
