import { Injectable } from "@angular/core";
import { Book } from "../books/book.model";
import { BookService } from "../books/book.service";

@Injectable()
export class SearchService
{
    private bookService:BookService;
    private searchResult:Book[];

    public constructor(bookService:BookService)
    {
        this.bookService = bookService;
        this.searchResult = [];
    }

    public searchBooks(searchQuery:string, searchField:string, searchFilter:string)
    {
        // Clear previous search result
        this.searchResult = [];

        // Get list of books
        const books = this.bookService.getBooks();

        // Search based on searchField
        switch(searchField)
        {
            case "1": {
                for(let book of books)
                {
                    if(searchQuery == book.name)
                        this.searchResult.push(book);
                }
                console.log(this.searchResult.length);
                break;
            }
        }
    }

}