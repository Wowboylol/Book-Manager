import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book.model';

@Component({
	selector: 'app-book-item',
	templateUrl: './book-item.component.html',
	styleUrls: ['./book-item.component.css']
})

export class BookItemComponent implements OnInit 
{
	@Input() book:Book;
	@Output() selectedBook = new EventEmitter<Book>();
	private _stars:number[];

	public constructor() 
	{ 
		this._stars = [0, 1, 2, 3, 4];
	}

	ngOnInit(): void {}

	public onSelected(selection:Book)
	{
		this.selectedBook.emit(selection);
	}

	public get stars():number[] { return this._stars; }
}
