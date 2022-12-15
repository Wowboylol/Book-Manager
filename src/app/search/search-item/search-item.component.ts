import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../books/book.model';
import { BookService } from '../../books/book.service';

@Component({
	selector: 'app-search-item',
	templateUrl: './search-item.component.html',
	styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit 
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
		navigator.clipboard.writeText(this.book.link);
		alert("Link copied to clipboard");
	}

	public get stars():number[] { return this._stars; }
}
