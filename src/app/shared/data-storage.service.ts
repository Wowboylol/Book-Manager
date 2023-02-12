import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";

import { BookService } from "../books/book.service";
import { Book } from "../books/book.model";
import { environment } from "../../environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService
{
    public constructor(private http:HttpClient, private bookService:BookService, private authService:AuthService) { }

    public storeBooks()
    {
        const books = this.bookService.getBooks().reverse();
        this.http.put(
            environment.firebase, 
            books
        )
        .subscribe(response => {
            console.log(response);
        });
    }

    public fetchBooks()
    {
        return this.http.get<Book[]>(
            environment.firebase
        ).pipe(
            map(books => {
                return books.map(book => {
                    return {...book, tags: book.tags ? book.tags:[]};
                });
            }),
            tap(books => {
                this.bookService.setBooks(books);
            })
        );
    }
}