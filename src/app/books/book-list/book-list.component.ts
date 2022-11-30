import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit 
{
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

	public get books():Book[] { return this._books; }
}
