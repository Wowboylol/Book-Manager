import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
	selector: 'app-search-edit',
	templateUrl: './search-edit.component.html',
	styleUrls: ['./search-edit.component.css']
})
export class SearchEditComponent implements OnInit 
{
	@ViewChild('searchQuery') searchQueryRef:ElementRef;
	@ViewChild('searchField') searchFieldRef:ElementRef;
	@ViewChild('searchFilter') searchFilterRef:ElementRef;
	private _searchService:SearchService;

	public constructor(searchService:SearchService) 
	{
		this._searchService = searchService;
	}

	ngOnInit(): void {}

	public onSubmitSearch()
	{
		const searchQuery = this.searchQueryRef.nativeElement.value;
		const searchField = this.searchFieldRef.nativeElement.value;
		const searchFilter = this.searchFilterRef.nativeElement.value;
		this._searchService.searchBooks(searchQuery, searchField, searchFilter);
	}
}
