import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TagService } from "../tags/tags.service";
import { Book } from "./book.model";

@Injectable()
export class BookService
{
	public booksChanged = new Subject<Book[]>();
    private books:Book[] = [];
    private selectedBook = new EventEmitter<Book>();

    public constructor(private tagService:TagService) { }

    public getBooks():Book[] { return this.books.slice(); }
	public getBook(index:number):Book { return this.books[index]; }
    public getSelectedBook():EventEmitter<Book> { return this.selectedBook; }

	public addBook(book:Book)
	{
		book.tags = this.tagService.addMultipleTags(book.tags.slice());
		this.books.unshift(book); 
		this.booksChanged.next(this.books.slice());
	}

	public setBooks(books:Book[])
	{
		for(let book of books)
		{
			book.tags = this.tagService.addMultipleTags(book.tags.slice());
			this.books.unshift(book);
		}
		this.booksChanged.next(this.books.slice());
	}

	public replaceBooks(books:Book[])
	{
		this.books = [];
		this.tagService.resetTags();
		for(let book of books)
		{
			book.tags = this.tagService.addMultipleTags(book.tags.slice());
			this.books.unshift(book);
		}
		this.booksChanged.next(this.books.slice());
	}

	public updateBook(index:number, newBook:Book) 
	{ 
		// Decrease tag amount for deleted book
		this.removeTags(index);

		// Update new book with updated tags
		newBook.tags = this.tagService.addMultipleTags(newBook.tags.slice());
		this.books[index] = newBook;
		this.booksChanged.next(this.books.slice());
	}

	public deleteBook(index:number)
	{
		// Decrease tag amount for deleted book
		this.removeTags(index);

		// After tags removed delete book
		this.books.splice(index, 1);
		this.booksChanged.next(this.books.slice());
	}

	public checkIfBookHasTag(book:Book, tagName:string):boolean
	{
		for(let tag of book.tags)
		{
			if(tag.name.toLowerCase() === tagName.toLowerCase()) { return true; }
		}
		return false;
	}

	// Helper function: removes old tags of to be deleted/updated book
	private removeTags(index:number)
	{
		this.tagService.updateAndDeleteTags(this.getBook(index).tags.slice());
	}
}