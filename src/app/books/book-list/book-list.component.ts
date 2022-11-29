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
	private _stars:number[];
	
	public constructor() 
	{ 
		this._books = [
			new Book("Test", "Placeholder", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 4),
			new Book("Test", "Placeholder", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 5)
		];
		this._stars = [0, 1, 2, 3, 4];
	}

	ngOnInit(): void 
	{

	}

	// Getters
	public get books():Book[] { return this._books; }
	public get stars():number[] { return this._stars; }
}
