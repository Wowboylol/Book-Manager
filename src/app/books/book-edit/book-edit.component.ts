import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book.model';

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
		// const newBook = new Book(
		// 	this.bookForm.value['name'],
		// 	this.bookForm.value['description'],
		// 	this.bookForm.value['link'],
		// 	this.bookForm.value['imagePath'],
		// 	this.bookForm.value['rating'],
		// 	this.bookForm.value['tags']
		// )
		if(this._editMode)
		{
			this.bookService.updateBook(this._bookID, this._bookForm.value);
		}
		else
		{
			this.bookService.addBook(this._bookForm.value);
		}
	}

	onAddTag():void
	{
		(<FormArray>this._bookForm.get('tags')).push(
			new FormGroup({'name': new FormControl(null, Validators.required)})
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
						new FormGroup({'name': new FormControl(tag.name, Validators.required)})
					);
				}
			}
		}

		this._bookForm = new FormGroup({
			'name': new FormControl(bookName, Validators.required),
			'imagePath': new FormControl(bookImagePath, Validators.required),
			'rating': new FormControl(bookRating, [Validators.required, Validators.min(0), Validators.max(5)]),
			'link': new FormControl(bookLink, Validators.required),
			'description': new FormControl(bookDescription, Validators.required),
			'tags': bookTags
		});
	}
}
