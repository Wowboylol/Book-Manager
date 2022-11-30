import { EventEmitter } from "@angular/core";
import { Tag } from "../shared/tag.model";
import { Book } from "./book.model";

export class BookService
{
    private books:Book[];
    private selectedBook = new EventEmitter<Book>();

    public constructor() 
	{ 
		this.books = [
			new Book(
				"Dive Into Design Patterns", 
				"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
				"https://refactoring.guru/design-patterns/book", 
				"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
			 	4, [
					new Tag("educational", 0)
			 	]),
			new Book(
				"Dive Into Design Patterns", 
				"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
				"https://refactoring.guru/design-patterns/book", 
				"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
				4, [
					new Tag("educational", 0)
				]),
			new Book(
				"Dive Into Design Patterns", 
				"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
				"https://refactoring.guru/design-patterns/book", 
				"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
			 	4, [
					new Tag("educational", 0)
			 	])
		];
	}

    public getBooks():Book[] { return this.books.slice(); }
    public getSelectedBook():EventEmitter<Book> { return this.selectedBook; }
}