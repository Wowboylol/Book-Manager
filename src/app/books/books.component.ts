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

	constructor() {}

	ngOnInit(): void {}

	public get bookDetails():Book { return this._bookDetails; }
	public set bookDetails(selection:Book) { this._bookDetails = selection; }
}
