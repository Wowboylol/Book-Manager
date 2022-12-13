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
				"Cosplay Girl and Doujin Artist", 
				"Why is she so into the doujin artist? Nobody will know.", 
				"https://nhentai.net/g/429525/", 
				"https://cdn.allporncomic.com/wp-content/uploads/WP-manga/data/manga_638484b85bd03/7d563d009966806c3bced7a01078876f/003.jpg", 
				4, [
					new Tag("multi-work", 0),
					new Tag("nakadashi", 0),
					new Tag("threesome", 0)
				]),
			new Book(
				"Wholesome Miyako 6", 
				"Miyako really loves you! <3", 
				"https://nhentai.net/g/418851/", 
				"https://m6.hentaiera.com/021/f4dj8tb351/2.jpg", 
				5, [
					new Tag("multi-work", 0),
					new Tag("nakadashi", 0),
					new Tag("wholesome", 0)
				]),
			new Book(
				"Beatrice Brothel", 
				"Where the maids in the mansion fuck their guests.", 
				"https://nhentai.net/g/425876/", 
				"https://i2.hentaifox.com/004/2362067/cover.jpg", 
				3, [
					new Tag("nakadashi", 0),
					new Tag("impregnation", 0)
				])
			// new Book(
			// 	"Dive Into Design Patterns", 
			// 	"The book 'Dive Into Design Patterns' illustrates 22 classic design patterns, and 8 design principles that these patterns are based on.", 
			// 	"https://refactoring.guru/design-patterns/book", 
			// 	"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 
			//  4, [
			// 		new Tag("educational", 0)
			//  ])
		];
	}

    public getBooks():Book[] { return this.books.slice(); }
    public getSelectedBook():EventEmitter<Book> { return this.selectedBook; }
}