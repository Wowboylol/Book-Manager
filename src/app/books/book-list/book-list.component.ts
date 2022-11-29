import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit 
{
	private _books:Book[];
	
	public constructor() 
	{ 
		this._books = [
			new Book("Test", "Placeholder", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 4),
			new Book("Test", "Placeholder", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 5),
			new Book("Test", "Placeholder", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 3)
		];
	}

	ngOnInit(): void 
	{

	}

	// Getters
	public get books():Book[] { return this._books; }
}
