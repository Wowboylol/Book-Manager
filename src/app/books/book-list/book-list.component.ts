import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
	private router:Router;
	private route:ActivatedRoute;
	private _books:Book[];
	private subscription:Subscription;
	
	public constructor(bookService:BookService, router:Router, route:ActivatedRoute)
	{
		this.bookService = bookService;
		this.router = router;
		this.route = route;
	}

	ngOnInit(): void 
	{
		this.subscription = this.bookService.booksChanged.subscribe(
			(books:Book[]) => {
				this._books = books;
			}
		);
		this._books = this.bookService.getBooks();
	}

	ngOnDestroy(): void 
	{
		this.subscription.unsubscribe();
	}

	public get books():Book[] { return this._books; }

	public onNewBook():void
	{
		this.router.navigate(['new'], {relativeTo: this.route});
	}
}
