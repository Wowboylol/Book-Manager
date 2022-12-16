import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';

const appRoutes:Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
	{ path: 'books', component: BooksComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'tags', component: TagsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }