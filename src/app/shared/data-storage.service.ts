import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BookService } from "../books/book.service";
import { Book } from "../books/book.model";
import { map, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class DataStorageService
{
    public constructor(private http:HttpClient, private bookService:BookService) { }

    storeBooks()
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

    fetchBooks()
    {
        return this.http.get<Book[]>(
            environment.firebase
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