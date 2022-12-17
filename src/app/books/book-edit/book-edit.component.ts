import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
	selector: 'app-book-edit',
	templateUrl: './book-edit.component.html',
	styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit 
{
	private route:ActivatedRoute;
	private router:Router;
	private bookService:BookService;
	private _bookID:number;
	private _editMode:boolean;
	private _bookForm:FormGroup;

	constructor(route:ActivatedRoute, bookService:BookService, router:Router)
	{ 
		this.route = route;
		this._editMode = false;
		this.bookService = bookService;
		this.router = router;
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
		if(this._editMode) this.bookService.updateBook(this._bookID, this._bookForm.value);
		else this.bookService.addBook(this._bookForm.value);
		this.onCancel();
	}

	onAddTag():void
	{
		(<FormArray>this._bookForm.get('tags')).push(
			new FormGroup({'name': new FormControl(null, Validators.required)})
		);
	}

	onCancel()
	{
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	onDeleteTag(index:number)
	{
		(<FormArray>this.bookForm.get('tags')).removeAt(index);
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
