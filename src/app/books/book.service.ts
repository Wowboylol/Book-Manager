import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Tag } from "../shared/tag.model";
import { TagService } from "../tags/tags.service";
import { Book } from "./book.model";

@Injectable()
export class BookService
{
	public booksChanged = new Subject<Book[]>();
    private books:Book[] = [];
    private selectedBook = new EventEmitter<Book>();

    public constructor(private tagService:TagService) 
	{ 
		this.addBook(new Book(
			"Dive Into Design Patterns", 
			"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
			"https://refactoring.guru/design-patterns/book", 
			"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
			4, [
				new Tag("educational", 0)
			])
		)
		this.addBook(new Book(
			"Dive Into Design Patterns", 
			"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
			"https://refactoring.guru/design-patterns/book", 
			"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
			4, [
				new Tag("educational", 0)
			])
		)
		this.addBook(new Book(
			"Dive Into Design Patterns", 
			"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
			"https://refactoring.guru/design-patterns/book", 
			"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
			4, [
				new Tag("educational", 0)
			])
		)
	}

    public getBooks():Book[] { return this.books.slice(); }
	public getBook(index:number):Book { return this.books[index]; }
    public getSelectedBook():EventEmitter<Book> { return this.selectedBook; }

	public addBook(book:Book)
	{
		book.tags = this.tagService.addMultipleTags(book.tags.slice());
		this.books.push(book); 
		this.booksChanged.next(this.books.slice());
	}

	public updateBook(index:number, newBook:Book) 
	{ 
		// Decrease tag amounts of old book
		const oldBook:Book = this.books[index];
		this.tagService.decreaseMultipleTagAmount(oldBook.tags);

		// Update new book with updated tags
		newBook.tags = this.tagService.addMultipleTags(newBook.tags.slice());
		this.books[index] = newBook; 
		this.booksChanged.next(this.books.slice());
	}
}