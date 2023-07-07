import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/search/search.service';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit, OnDestroy
{
	private bookService:BookService
	private searchService:SearchService;
	private router:Router;
	private route:ActivatedRoute;
	private _books:Book[] = [];
	private _bookIndexes:number[] = [];
	private bookDisplayLimit:number;
	private displaySearchResults:boolean;
	private subscription:Subscription;
	private searchSubscription:Subscription;
	
	public constructor(bookService:BookService, searchService:SearchService, router:Router, route:ActivatedRoute)
	{
		this.bookService = bookService;
		this.searchService = searchService;
		this.displaySearchResults = false;
		this.bookDisplayLimit = 5;
		this.router = router;
		this.route = route;
	}

	ngOnInit():void 
	{
		this.subscription = this.bookService.booksChanged.subscribe(
			(books:Book[]) => {
				// If book has been deleted, set displaySearchResults to false
				if(this._books.length > books.length) { this.displaySearchResults = false; }
				this._books = books;

				// If searching, display search results, else display all books
				if(this.displaySearchResults) return;
				else if(this.isBookOverLimit()) this._bookIndexes = Array.from(Array(this.bookDisplayLimit),(x,i)=>i);
				else this._bookIndexes = Array.from(Array(books.length),(x,i)=>i);
			}
		);
		this.searchSubscription = this.searchService.searchChange.subscribe(
			(searchedBooks:Book[]) => {
				this._bookIndexes = this.searchService.searchResultIndexes;

				if(this.isBookOverLimit()) this._bookIndexes.length = this.bookDisplayLimit;
			}
		);
		this.resetBookView();
	}

	ngOnDestroy():void 
	{
		this.subscription.unsubscribe();
		this.searchSubscription.unsubscribe();
	}

	public get books():Book[] { return this._books; }
	public get bookIndexes():number[] { return this._bookIndexes; }

	public onNewBook():void
	{
		this.router.navigate(['new'], {relativeTo: this.route});
	}

	public onQuickSearch(searchTerm:string):void
	{
		if(searchTerm == "" || searchTerm == null || searchTerm.startsWith(" ")) 
		{
			this.displaySearchResults = false;
			this.resetBookView();
			return;
		}
		this.displaySearchResults = true;
		this.searchService.searchBooks(searchTerm, "1", "5");
		this.resetBookView();
	}

	// Returns true if the amount of books is over the display limit
	public isBookOverLimit():boolean
	{
		if(this.displaySearchResults) return false;
		if(this._books.length > this.bookDisplayLimit) return true;
		return false;
	}

	// Increase book limit
	public increaseBookLimit():void
	{
		this.bookDisplayLimit += 5;
		this.resetBookView();
	}

	// Removes quick search results
	private resetBookView():void
	{
		if(this.displaySearchResults) 
		{
			this._bookIndexes = this.searchService.searchResultIndexes;
		}
		else
		{
			this._books = this.bookService.getBooks();
		
			if(this.isBookOverLimit()) this._bookIndexes = Array.from(Array(this.bookDisplayLimit),(x,i)=>i);
			else this._bookIndexes = Array.from(Array(this._books.length),(x,i)=>i);
		}
	}
}
