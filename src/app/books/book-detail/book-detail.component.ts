import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/tags/tags.service';
import { BookService } from '../book.service';
import { Book } from '../book.model';

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
	private _tagService:TagService;
	private _bookService:BookService;
	private bookID;

	public constructor(tagService:TagService, bookService:BookService, router:Router, route:ActivatedRoute) 
	{
		this._tagService = tagService;
		this._bookService = bookService;
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
}
