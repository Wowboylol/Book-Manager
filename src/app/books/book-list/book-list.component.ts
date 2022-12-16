import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit 
{
	private bookService:BookService
	private router:Router;
	private route:ActivatedRoute;
	private _books:Book[];
	
	public constructor(bookService:BookService, router:Router, route:ActivatedRoute)
	{
		this.bookService = bookService;
		this.router = router;
		this.route = route;
	}

	ngOnInit(): void 
	{
		this._books = this.bookService.getBooks();
	}

	public get books():Book[] { return this._books; }

	public onNewBook():void
	{
		this.router.navigate(['new'], {relativeTo: this.route});
	}
}
