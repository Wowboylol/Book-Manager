import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book.model';

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit 
{
	@Input() selectedBook:Book;

	constructor() {}

	ngOnInit(): void {}
}
