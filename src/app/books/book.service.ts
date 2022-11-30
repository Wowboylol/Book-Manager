import { Book } from "./book.model";

export class BookService
{
    private _books:Book[];

    public constructor() 
	{ 
		this._books = [
			new Book("Book1", "Placeholder description 1", "Placeholder link 1", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 4),
			new Book("Book2", "Placeholder description 2", "Placeholder link 2", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 5),
			new Book("Book3", "Placeholder description 3", "Placeholder link 3", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543945452i/43125355.jpg", 3)
		];
	}

    public getBooks():Book[] { return this._books.slice(); }
}