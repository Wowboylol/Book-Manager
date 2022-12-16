import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../book.model';

@Component({
	selector: 'app-book-item',
	templateUrl: './book-item.component.html',
	styleUrls: ['./book-item.component.css']
})

export class BookItemComponent implements OnInit 
{
	@Input() book:Book;
	@Input() bookID:number;
	private _stars:number[];

	public constructor() 
	{ 
		this._stars = [0, 1, 2, 3, 4];
	}

	ngOnInit(): void {}

	public get stars():number[] { return this._stars; }
}
