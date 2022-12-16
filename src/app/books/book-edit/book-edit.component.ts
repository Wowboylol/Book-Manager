import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
	selector: 'app-book-edit',
	templateUrl: './book-edit.component.html',
	styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit 
{
	private route:ActivatedRoute;
	private bookService:BookService;
	private _bookID:number;
	private _editMode:boolean;
	private _bookForm:FormGroup;

	constructor(route:ActivatedRoute, bookService:BookService)
	{ 
		this.route = route;
		this._editMode = false;
		this.bookService = bookService;
	}

	ngOnInit(): void 
	{
		this.route.params.subscribe(params => 
		{
			this._bookID = +params['id'];
			this._editMode = params['id'] != null;
			this.initForm();
		});
	}

	get bookForm():FormGroup { return this._bookForm; }

	private initForm():void
	{
		let bookName = '';
		let bookImagePath = '';
		let bookRating;
		let bookLink = '';
		let bookDescription = '';

		if(this._editMode)
		{
			const book = this.bookService.getBook(this._bookID);
			bookName = book.name;
			bookImagePath = book.imagePath;
			bookRating = book.rating;
			bookLink = book.link;
			bookDescription = book.description;
		}

		this._bookForm = new FormGroup({
			'name': new FormControl(bookName),
			'imagePath': new FormControl(bookImagePath),
			'rating': new FormControl(bookRating),
			'link': new FormControl(bookLink),
			'description': new FormControl(bookDescription)
		});
	}

	onSubmit():void
	{
		console.log(this._bookForm);
	}
}
