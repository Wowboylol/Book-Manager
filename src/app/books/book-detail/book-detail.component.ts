import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/shared/tag.model';
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
	selectedBook:Book;
	private route:ActivatedRoute;
	private _tagService:TagService;
	private _bookService:BookService;
	private bookID:number;

	public constructor(tagService:TagService, bookService:BookService, route:ActivatedRoute) 
	{
		this._tagService = tagService;
		this._bookService = bookService;
		this.route = route;
	}

	ngOnInit(): void 
	{
		this.route.params.subscribe(
			(params) => {
				this.bookID = +params['id'];
				this.selectedBook = this._bookService.getBook(this.bookID);
			}
		);
	}

	public exportTags(tags:Tag[])
	{
		this._tagService.addMultipleTags(tags);
	}
}
