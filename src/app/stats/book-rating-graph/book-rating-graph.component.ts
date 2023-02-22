import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Subscription } from 'rxjs';

import { BookService } from 'src/app/books/book.service';
import { Book } from 'src/app/books/book.model';

@Component({
	selector: 'app-book-rating-graph',
	templateUrl: './book-rating-graph.component.html',
	styleUrls: ['./book-rating-graph.component.css']
})
export class BookRatingGraphComponent implements OnInit, OnDestroy
{
	// Attributes
	public barChart: Chart;
	private subscription: Subscription;

	// Data
	public totalBooks: number = 0;
	public averageRating: number = 0;
	private zeroStar: number = 0;
	private oneStar: number = 0;
	private twoStar: number = 0;
	private threeStar: number = 0;
	private fourStar: number = 0;
	private fiveStar: number = 0;

	// Methods
	constructor(private bookService:BookService) { }

	ngOnInit(): void 
	{
		this.updateData(this.bookService.getBooks());
		this.createChart();
		this.subscription = this.bookService.booksChanged.subscribe(
			(books:Book[]) => {
				this.updateData(books);
				this.updateChart();
			}
		);
	}

	ngOnDestroy(): void
	{
		this.subscription.unsubscribe();
	}

	public createChart(): void
	{
		this.barChart = new Chart('barChart', {
			type: 'bar',
			data: {
				labels: ['0 Star', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
				datasets: [{
					label: 'Number of Books',
					data: [this.zeroStar, this.oneStar, this.twoStar, this.threeStar, this.fourStar, this.fiveStar],
					backgroundColor: [
						'rgba(251, 204, 70, 0.35)'
					],
					borderColor: [
						'rgba(251, 204, 70, 1)'
					],
					borderWidth: 2
				}]
			},
			options: {
				scales: {
					y: {
						title: {
							display: true,
							text: 'Number of Books'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Book Rating'
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
	}

	public updateData(books:Book[]): void
	{
		// Reset data
		this.totalBooks = books.length;
		this.zeroStar = 0;
		this.oneStar = 0;
		this.twoStar = 0;
		this.threeStar = 0;
		this.fourStar = 0;
		this.fiveStar = 0;

		// Count number of books with each rating
		for (let book of books)
		{
			switch (book.rating)
			{
				case 0: this.zeroStar++; break;
				case 1: this.oneStar++; break;
				case 2: this.twoStar++; break;
				case 3: this.threeStar++; break;
				case 4: this.fourStar++; break;
				case 5: this.fiveStar++; break;
			}
		}

		// Calculate metadata
		if(this.totalBooks == 0)
		{
			this.averageRating = 0;
		}
		else
		{
			this.averageRating = 
				Math.round(
					(this.zeroStar * 0 + this.oneStar * 1 + this.twoStar * 2 + 
						this.threeStar * 3 + this.fourStar * 4 + this.fiveStar * 5) 
						/ this.totalBooks * 100
				) / 100;
		}
	}

	public updateChart(): void
	{
		this.barChart.data.datasets[0].data = [this.zeroStar, this.oneStar, this.twoStar, this.threeStar, this.fourStar, this.fiveStar];
		this.barChart.update();
	}
}
