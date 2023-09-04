import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { TagService } from 'src/app/tags/tags.service';
import { BookService } from 'src/app/books/book.service';
import { Book } from 'src/app/books/book.model';

@Component({
	selector: 'app-tag-rating-graph',
	templateUrl: './tag-rating-graph.component.html',
	styleUrls: ['./tag-rating-graph.component.css']
})
export class TagRatingGraphComponent implements OnInit 
{
	@ViewChild('tagDataQuery') searchQueryRef:ElementRef;

	// Attributes
	public tagRatingChart: Chart;
	public validQuery: boolean = true;
	private queried: boolean = false;

	// Data
	public totalTagged: number = 0;
	public averageRating: number = 0;
	private chosenTag: string = '';
	private zeroStar: number = 0;
	private oneStar: number = 0;
	private twoStar: number = 0;
	private threeStar: number = 0;
	private fourStar: number = 0;
	private fiveStar: number = 0;

	// Methods
	constructor(private tagService:TagService, private bookService:BookService) { }

	ngOnInit(): void 
	{

	}

	public getAverageTagRating(): boolean
	{
		if(this.tagService.checkIfTagExists(this.chosenTag))
		{
			this.updateData(this.bookService.getBooks());
			if(this.queried) { this.updateChart(); }
			else { this.createChart(); }
			return true;
		}
		return false;
	}

	public createChart(): void
	{
		this.tagRatingChart = new Chart('tagRatingChart', {
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
					},
					title: {
						display: true,
						text: 'Number of Books by Rating with Tag "' + this.chosenTag + '"'
					}
				}
			}
		});
		this.queried = true;
	}

	public updateChart(): void
	{
		this.tagRatingChart.data.datasets[0].data = [this.zeroStar, this.oneStar, this.twoStar, this.threeStar, this.fourStar, this.fiveStar];
		this.tagRatingChart.options.plugins.title.text = 'Number of Books by Rating with Tag "' + this.chosenTag + '"';
		this.tagRatingChart.update();
	}

	public updateData(books:Book[]): void
	{
		// Reset data
		this.totalTagged = 0;
		this.zeroStar = 0;
		this.oneStar = 0;
		this.twoStar = 0;
		this.threeStar = 0;
		this.fourStar = 0;
		this.fiveStar = 0;

		// Count number of books with each rating if it contains the chosen tag
		for (let book of books)
		{
			if (this.bookService.checkIfBookHasTag(book, this.chosenTag))
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
				this.totalTagged++;
			}
		}

		// Calculate metadata
		if(this.totalTagged == 0)
		{
			this.averageRating = 0;
		}
		else
		{
			this.averageRating = 
				Math.round(
					(this.zeroStar * 0 + this.oneStar * 1 + this.twoStar * 2 + 
						this.threeStar * 3 + this.fourStar * 4 + this.fiveStar * 5) 
						/ this.totalTagged * 100
				) / 100;
		}
	}

	public onTagDataQuery()
	{
		this.chosenTag = this.searchQueryRef.nativeElement.value;
		this.validQuery = this.getAverageTagRating();
	}

	public getAllTags()
	{
		return this.tagService.getTags();
	}
}
