import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BookService } from 'src/app/books/book.service';

@Component({
	selector: 'app-book-rating-graph',
	templateUrl: './book-rating-graph.component.html',
	styleUrls: ['./book-rating-graph.component.css']
})
export class BookRatingGraphComponent implements OnInit 
{
	public barChart: Chart;

	constructor(private bookService:BookService) { }

	ngOnInit(): void {}
}
