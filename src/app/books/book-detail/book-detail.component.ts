import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { SearchService } from 'src/app/search/search.service';
import { Book } from '../book.model';
import { SearchField } from 'src/app/shared/searchField.model';
import { SearchFilter } from 'src/app/shared/searchFilter.model';

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit 
{
	public selectedBook:Book;
	private router:Router;
	private route:ActivatedRoute;
	private _bookService:BookService;
	private searchService:SearchService;
	private bookID;

	public constructor(bookService:BookService, searchService:SearchService, router:Router, route:ActivatedRoute) 
	{
		this._bookService = bookService;
		this.searchService = searchService;
		this.router = router;
		this.route = route;
	}

	ngOnInit(): void 
	{
		this.route.params.subscribe(
			(params) => {
				this.bookID = +params['id'];
				this.selectedBook = this._bookService.getBook(+params['id']);
			}
		);
	}

	public onEditBook():void
	{
		this.router.navigate(['edit'], {relativeTo: this.route});
	}

	public onDeleteBook():void
	{
		this._bookService.deleteBook(this.bookID);
		this.router.navigate(['/books']);
	}

	public redirectToTagSearch(tagName:string):void
	{
		this.router.navigate(['/search']);
		setTimeout(() => { this.searchService.searchBooks(tagName, "2", "4"); }, 500);
	}
}
