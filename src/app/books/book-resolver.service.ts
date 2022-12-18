import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Book } from './book.model';
import { DataStorageService } from '../shared/data-storage.service';
import { BookService } from './book.service';

@Injectable()
export class BookResolverService implements Resolve<Book[]> 
{
    public constructor(private dataStorage:DataStorageService, private bookService:BookService) { }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
    {
        const books = this.bookService.getBooks();

        if(books.length === 0)
        {
            return this.dataStorage.fetchBooks();
        }
        else
        {
            return books;
        }
    }
}