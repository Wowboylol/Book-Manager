import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../book.model';
import { BookService } from '../../book.service';

@Component({
	selector: 'app-book-item',
	templateUrl: './book-item.component.html',
	styleUrls: ['./book-item.component.css']
})

export class BookItemComponent implements OnInit 
{
	@Input() book:Book;
	private _stars:number[];
	private _bookService:BookService

	public constructor(bookService:BookService) 
	{ 
		this._stars = [0, 1, 2, 3, 4];
		this._bookService = bookService;
	}

	ngOnInit(): void {}

	public onSelected()
	{
		this._bookService.getSelectedBook().emit(this.book);
	}

	public get stars():number[] { return this._stars; }
}
