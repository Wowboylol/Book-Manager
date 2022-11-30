import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TagsComponent } from './tags/tags.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookItemComponent } from './books/book-list/book-item/book-item.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { TagService } from './tags/tags.service';
import { SearchComponent } from './search/search.component';
import { SearchEditComponent } from './search/search-edit/search-edit.component';
import { SearchService } from './search/search.service';
import { BookService } from './books/book.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		TagsComponent,
		BooksComponent,
		BookListComponent,
		BookDetailComponent,
		BookItemComponent,
		TagEditComponent,
		SearchComponent,
		SearchEditComponent
	],
	imports: [
		BrowserModule
	],
	providers: [
		TagService,
		SearchService,
		BookService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
