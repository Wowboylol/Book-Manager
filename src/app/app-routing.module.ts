import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';
import { BookDefaultComponent } from './books/book-default/book-default.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookResolverService } from './books/book-resolver.service';

const appRoutes:Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
	{ path: 'books', component: BooksComponent, children: [
        { path: '', component: BookDefaultComponent },
        { path: 'new', component: BookEditComponent },
        { path: ':id', component: BookDetailComponent, resolve: [BookResolverService] },
        { path: ':id/edit', component: BookEditComponent, resolve: [BookResolverService] }
    ]},
	{ path: 'search', component: SearchComponent },
	{ path: 'tags', component: TagsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }