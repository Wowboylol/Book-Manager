import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { StatsComponent } from './stats/stats.component';
import { BookRatingGraphComponent } from './stats/book-rating-graph/book-rating-graph.component';
import { TagUsageGraphComponent } from './stats/tag-usage-graph/tag-usage-graph.component';
import { TagRatingGraphComponent } from './stats/tag-rating-graph/tag-rating-graph.component';

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
		LoadingSpinnerComponent,
		StatsComponent,
		BookRatingGraphComponent,
  TagUsageGraphComponent,
  TagRatingGraphComponent
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
		BookResolverService,
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
