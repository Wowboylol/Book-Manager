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
	public invalidField:boolean;
	public invalidFilter:boolean;

	public constructor(searchService:SearchService) 
	{
		this._searchService = searchService;
		this.invalidField = false;
		this.invalidFilter = false;
	}

	ngOnInit(): void {}

	public onSubmitSearch()
	{
		const searchQuery = this.searchQueryRef.nativeElement.value;
		const searchField = this.searchFieldRef.nativeElement.value;
		const searchFilter = this.searchFilterRef.nativeElement.value;

		if(searchField == 0) 
			this.invalidField = true;
		else if(searchFilter == 0) 
		{ 
			this.invalidField = false;
			this.invalidFilter = true;
		}
		else
		{
			this.invalidField = false;
			this.invalidFilter = false;
			this._searchService.searchBooks(searchQuery, searchField, searchFilter);
		}
	}
}
