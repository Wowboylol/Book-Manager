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
    private _searchResultIndexes:number[];

    public constructor(bookService:BookService)
    {
        this.bookService = bookService;
        this.searchResult = [];
        this._searchResultIndexes = [];
    }

    public get searchResultIndexes():number[] { return this._searchResultIndexes; }

    public searchBooks(searchQuery:string, searchField:string, searchFilter:string)
    {
        // Clear previous search result
        this.searchResult = [];
        this._searchResultIndexes = [];

        // Get list of books
        const books = this.bookService.getBooks();

        // Search based on searchField
        switch(this.toEnumField(searchField))
        {
            case "Name": {
                for(let i = 0; i < books.length; i++)
                {
                    const lowerCase = books[i].name.toLowerCase();
                    if(lowerCase.includes(searchQuery) == true || books[i].name.includes(searchQuery) == true)
                    {
                        this.searchResult.push(books[i]);
                        this._searchResultIndexes.push(i);
                    }
                }
                break;
            }
            case "Tags": {
                const multipleTags = searchQuery.split(",");
                const trimmedTags = multipleTags.map(tag => tag.trim());

                const includeTags = [];
                const excludeTags = [];

                for(let tag of trimmedTags)
                {
                    if(tag.startsWith("-")) { excludeTags.push(tag.substring(1)); }
                    else { includeTags.push(tag); }
                }

                for(let book of books)
                {
                    if(
                        this.checkIfBookIncludesTags(book, includeTags) == true && 
                        this.checkIfBookExcludesTags(book, excludeTags) == true
                    ) {
                        this.searchResult.push(book);
                    }
                }
            }
        }
        this.sortBooks(this.toEnumFilter(searchFilter));
        this.searchChange.emit(this.searchResult.slice());
    }

    // Sorts search result based on searchFilter
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
            case "MostRecentlyAdded":
                // Search result already in most recently added order
                break;
            case "LeastRecentlyAdded":
                this.searchResult.reverse();
                break;
        }
    }

    // Checks if book contains given list of tags
    private checkIfBookIncludesTags(book:Book, tags:string[]):boolean
    {
        for(let tag of tags) {
            if(this.bookService.checkIfBookHasTag(book, tag.toLowerCase()) == false) { return false; }
        }
        return true;
    }

    // Checks if book does not contain given list of tags
    private checkIfBookExcludesTags(book:Book, tags:string[]):boolean
    {
        for(let tag of tags) {
            if(this.bookService.checkIfBookHasTag(book, tag.toLowerCase()) == true) { return false; }
        }
        return true;
    }

    private toEnumField(searchField:string):string { return SearchField[Number(searchField)-1]; }
    private toEnumFilter(searchFilter:string):string { return SearchFilter[Number(searchFilter)-1]; }
}