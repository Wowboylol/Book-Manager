import { Component, OnInit } from '@angular/core';
import { Book } from '../books/book.model';
import { SearchService } from './search.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit 
{
	private _searchedBooks:Book[];
	private _searchService:SearchService;

	public constructor(searchService:SearchService) 
	{
		this._searchService = searchService;
	}

	ngOnInit():void 
	{
		this._searchService.searchChange.subscribe((searchedBooks:Book[]) => {
			this._searchedBooks = searchedBooks;
			console.log(this._searchedBooks.length);
		})
	}

	public get searchedBooks():Book[] { return this._searchedBooks; }
}
