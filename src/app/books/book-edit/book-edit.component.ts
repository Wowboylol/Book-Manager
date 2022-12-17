import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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

	public get bookForm():FormGroup { return this._bookForm; }
	public get controls() { return (<FormArray>this._bookForm.get('tags')).controls; }

	onSubmit():void
	{
		console.log(this._bookForm);
	}

	onAddTag():void
	{
		(<FormArray>this._bookForm.get('tags')).push(
			new FormGroup({'name': new FormControl()})
		);
	}

	private initForm():void
	{
		let bookName = '';
		let bookImagePath = '';
		let bookRating;
		let bookLink = '';
		let bookDescription = '';
		let bookTags = new FormArray([]);

		if(this._editMode)
		{
			const book = this.bookService.getBook(this._bookID);
			bookName = book.name;
			bookImagePath = book.imagePath;
			bookRating = book.rating;
			bookLink = book.link;
			bookDescription = book.description;

			if(book['tags'])
			{
				for(let tag of book.tags)
				{
					bookTags.push(
						new FormGroup({'name': new FormControl(tag.name)})
					);
				}
			}
		}

		this._bookForm = new FormGroup({
			'name': new FormControl(bookName),
			'imagePath': new FormControl(bookImagePath),
			'rating': new FormControl(bookRating),
			'link': new FormControl(bookLink),
			'description': new FormControl(bookDescription),
			'tags': bookTags
		});
	}
}
