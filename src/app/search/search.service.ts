import { Injectable } from "@angular/core";
import { Book } from "../books/book.model";
import { BookService } from "../books/book.service";
import { SearchField } from "../shared/searchField.model";

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

    private toEnum(searchField:string):string { return SearchField[Number(searchField)-1]; }

    public searchBooks(searchQuery:string, searchField:string, searchFilter:string)
    {
        // Clear previous search result
        this.searchResult = [];

        // Get list of books
        const books = this.bookService.getBooks();

        // Search based on searchField
        switch(this.toEnum(searchField))
        {
            case "Name": {
                for(let book of books)
                {
                    if(book.name.includes(searchQuery) == true)
                        this.searchResult.push(book);
                }
                console.log(this.searchResult.length);
                break;
            }
        }
    }

}