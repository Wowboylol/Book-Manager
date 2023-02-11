import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { AppRoutingModule } from './app-routing.module';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { BookDefaultComponent } from './books/book-default/book-default.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookResolverService } from './books/book-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

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
		SearchEditComponent,
  		SearchItemComponent,
		BookDefaultComponent,
		BookEditComponent,
		AuthComponent,
		LoadingSpinnerComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [
		TagService,
		SearchService,
		BookService,
		BookResolverService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
