import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BookService } from "../books/book.service";
import { Book } from "../books/book.model";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService
{
    public constructor(private http:HttpClient, private bookService:BookService) { }

    storeBooks()
    {
        const books = this.bookService.getBooks().reverse();
        this.http.put(
            '', 
            books
        )
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchBooks()
    {
        return this.http.get<Book[]>(
            ''
        )
        .pipe(
            map(books => {
                return books.map(book => {
                    return {...book, tags: book.tags ? book.tags:[]};
                });
            }),
            tap(books => {
                this.bookService.setBooks(books);
            })
        )
    }
}