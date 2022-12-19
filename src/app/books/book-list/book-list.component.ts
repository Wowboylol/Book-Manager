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
	private _books:Book[];
	private _bookIndexes:number[];
	private subscription:Subscription;
	private searchSubscription:Subscription;
	
	public constructor(bookService:BookService, searchService:SearchService, router:Router, route:ActivatedRoute)
	{
		this.bookService = bookService;
		this.searchService = searchService;
		this.router = router;
		this.route = route;
	}

	ngOnInit():void 
	{
		this.subscription = this.bookService.booksChanged.subscribe(
			(books:Book[]) => {
				this._books = books;
				this._bookIndexes = Array.from(Array(books.length),(x,i)=>i)
			}
		);
		this.searchSubscription = this.searchService.searchChange.subscribe(
			(searchedBooks:Book[]) => {
				this._bookIndexes = this.searchService.searchResultIndexes;
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
			this.resetBookView();
			return;
		}
		this.searchService.searchBooks(searchTerm, "1", "5");
	}

	// Removes quick search results
	private resetBookView():void
	{
		this._books = this.bookService.getBooks();
		this._bookIndexes = Array.from(Array(this._books.length),(x,i)=>i)
	}
}
