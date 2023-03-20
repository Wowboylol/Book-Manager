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
                for(let book of books)
                {
                    let missingTags = false;
                    for(let tag of trimmedTags)
                    {
                        if(this.bookService.checkIfBookHasTag(book, tag.toLowerCase()) == false) 
                        { 
                            missingTags = true; 
                            break; 
                        }
                    }
                    if(missingTags == false) { this.searchResult.push(book); }
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
            case "MostRecentlyAdded":
                // Search result already in most recently added order
                break;
            case "LeastRecentlyAdded":
                this.searchResult.reverse();
                break;
        }
    }

    private toEnumField(searchField:string):string { return SearchField[Number(searchField)-1]; }
    private toEnumFilter(searchFilter:string):string { return SearchFilter[Number(searchFilter)-1]; }
}