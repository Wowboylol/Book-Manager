import { EventEmitter, Injectable } from "@angular/core";
import { Book } from "../books/book.model";
import { BookService } from "../books/book.service";
import { SearchField } from "../shared/searchField.model";
import { SearchFilter } from "../shared/searchFilter.model";

@Injectable()
export class SearchService
{
    searchChange = new EventEmitter<Book[]>();
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
        switch(this.toEnumField(searchField))
        {
            case "Name": {
                for(let book of books)
                {
                    const lowerCase = book.name.toLowerCase();
                    if(lowerCase.includes(searchQuery) == true || book.name.includes(searchQuery) == true)
                        this.searchResult.push(book);
                }
                break;
            }
            case "Tags": {
                for(let book of books)
                {
                    if(this.bookService.checkIfBookHasTag(book, searchQuery.toLowerCase()) == true)
                        this.searchResult.push(book);
                }
            }
        }
        this.sortBooks(this.toEnumFilter(searchFilter));
        this.searchChange.emit(this.searchResult.slice());
    }

    // Helper functions
    private sortBooks(searchFilter:string)
    {
        switch(searchFilter)
        {
            case "AlphabeticalAscending":
                this.searchResult.sort((book1, book2) => book1.name.localeCompare(book2.name));
                break;
            case "AlphabeticalDescending":
                this.searchResult.sort((book1, book2) => book2.name.localeCompare(book1.name));
                break;
            case "RatingAscending":
                this.searchResult.sort((book1, book2) => book1.rating - book2.rating);
                break;
            case "RatingDescending":
                this.searchResult.sort((book1, book2) => book2.rating - book1.rating);
                break;
        }
    }

    private toEnumField(searchField:string):string { return SearchField[Number(searchField)-1]; }
    private toEnumFilter(searchFilter:string):string { return SearchFilter[Number(searchFilter)-1]; }
}