import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../books/book.model';
import { SearchService } from './search.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy
{
	private _searchedBooks:Book[];
	private _searchService:SearchService;
	private _noSearchFound:boolean;
	private subscription:Subscription;

	public constructor(searchService:SearchService) 
	{
		this._searchService = searchService;
		this._noSearchFound = false;
	}

	ngOnInit():void 
	{
		this.subscription = this._searchService.searchChange.subscribe((searchedBooks:Book[]) => {
			this._searchedBooks = searchedBooks;
			this._noSearchFound = (searchedBooks.length == 0) ? true : false;
		})
	}

	ngOnDestroy(): void 
	{
		this.subscription.unsubscribe();
	}

	public get searchedBooks():Book[] { return this._searchedBooks; }
	public get noSearchFound():boolean { return this._noSearchFound; }
}
