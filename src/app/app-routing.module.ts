import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';
import { BookDefaultComponent } from './books/book-default/book-default.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

const appRoutes:Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
	{ path: 'books', component: BooksComponent, children: [
        { path: '', component: BookDefaultComponent },
        { path: ':id', component: BookDetailComponent }
    ]},
	{ path: 'search', component: SearchComponent },
	{ path: 'tags', component: TagsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }